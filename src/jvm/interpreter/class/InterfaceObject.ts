import { randomUUID } from 'crypto'
import { cloneDeep } from 'lodash'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import type { AttributeBootstrapMethods, AttributeBootstrapMethodsBootstrapMethod } from '../../parser/types/attributes/AttributeBootstrapMethods'
import type { CPInfo } from '../../parser/types/CPInfo'
import type { DataType } from '../data-types/data-type'
import { ReferenceType } from '../data-types/ReferenceType'
import type { Instruction } from '../instructions/Instruction'
import type { ConstantPool } from '../memory/constant-pool'
import { HEAP_TYPES } from '../memory/HeapTypes'
import { LocalVariables } from '../memory/LocalVariables'
import { OperandStack } from '../memory/operand-stack'
import type { ExecutionContext } from '../util/ExecutionContext'
import type { MethodObject } from '../util/MethodObject'
import { Stack } from '../util/Stack'
import type { ClassInstance } from './ClassInstance'
import { ClassManager, ClassState } from '../manager/ClassManager'
import type { ExecutableInterface } from './ExecutableInterface'
import { RuntimeManager } from '../manager/RuntimeManager'
import { ExecutionManager } from '../manager/ExecutionManager'

export class InterfaceObject implements ExecutableInterface {
	private superClassInstance: ClassInstance | undefined
	private readonly superInterfaces = new Set<InterfaceObject>()
	private readonly executionContexts = new Stack<ExecutionContext>()
	private readonly fieldIndices = new Map<string, number>()

	constructor(
		private readonly name: string,
		private readonly runtimeConstantPool: ConstantPool,
		private readonly accessFlags: number,
		private readonly staticFields: Map<string, DataType<any>>,
		private readonly staticFieldSignatures: Map<string, string>,
		private readonly staticFieldModifiers: Map<string, number>,
		private readonly methods: Map<string, MethodObject>,
		private readonly superClass: string | undefined,
		private readonly superInterfaceNames: Set<string>,
		private readonly bootstrapMethods: AttributeBootstrapMethods | undefined,
		private readonly version: { major: number, minor: number },
		private readonly id = randomUUID()
	) {
		let fieldCounter = 0
		for (const key of staticFields.keys()) this.fieldIndices.set(key, fieldCounter++)
	}

	public getName(): string {
		return this.name
	}

	public getId(): string {
		return this.id
	}

	public constant(index: number): CPInfo<any> {
		return this.runtimeConstantPool.get(index)
	}

	public findMethod(methodIdentifier: string): MethodObject {
		let method = this.methods.get(methodIdentifier)
		if (!method && this.superClass) {
			const superClass = ClassManager.it().getClass(this.superClass)
			method = superClass.findMethod(methodIdentifier)
		}
		if (!method) {
			for (const superInterface of this.superInterfaces.keys()) {
				method = superInterface.findMethod(methodIdentifier)
				if (method) return method
			}
		}
		if (!method) throw new Error(`Could not find method: ${methodIdentifier} on ${this.name}`)
		return method
	}

	public getMethod(name: string, descriptor: string): MethodObject {
		return this.findMethod(this.constructMethodIdentifier(name, descriptor))
	}

	public getStaticField(name: string): DataType<any> {
		const value = this.staticFields.get(name)
		if (!value && !this.getSuperClass()) throw new Error(`Could not find static field ${name} on ${this.name}`)
		else if (!value) return this.superClassInstance!.getStaticField(name)
		else if (value instanceof ReferenceType && value.get().address?.getType() === HEAP_TYPES.UNRESOLVED_CLASS_OR_INTERFACE) {
			RuntimeManager.it().load(value)
			return value
		}
		return value
	}

	public getStaticFields(): Map<string, DataType<any>> {
		return this.staticFields
	}

	public getSuperClass(): ClassInstance | undefined {
		if (!this.superClass) return undefined
		else if (!this.superClassInstance) {
			this.superClassInstance = ClassManager.it().newInstance(this.superClass)
		}
		return this.superClassInstance
	}

	public getSuperInterfaces(): Set<InterfaceObject> {
		if (this.superInterfaces.size === 0) {
			for (const superInterfaceName of this.superInterfaceNames.values()) {
				const superInterface = ClassManager.it().getInterface(superInterfaceName)
				this.superInterfaces.add(superInterface)
			}
		}
		return this.superInterfaces
	}

	public hasSuperInterface(superInterface: InterfaceObject): boolean {
		for (const superInterfaceName of this.superInterfaceNames.values()) {
			if (superInterfaceName === superInterface.getName()) return true
		}
		return false
	}

	public jumpByOffset(offset: number): void {
		this.executionContexts.current().instructionStream.setOffset(offset)
	}

	public setupFunctionCall(name: string, descriptor: string, callerName: string): void {
		const method = cloneDeep(this.getMethod(name, descriptor))
		method.callerName = callerName
		if (method.accessFlags & MethodAccessFlags.ACC_NATIVE) this.setupNativeFunctionCall(method)
		else if (method.accessFlags & MethodAccessFlags.ACC_STATIC) this.executionContexts.push(this.newExecutionContext(method))
	}

	public executeFunctionCall(): void {
		if (this.currentMethod().operandStack.isNative) this.executeNativeFunctionCall()
	}

	public returnFromFunction(): void {
		this.executionContexts.pop()
	}

	public setReturnValueOnSelf(value: DataType<any>): void {
		const currentContext = this.executionContexts.pop()
		this.push(value)
		this.executionContexts.push(currentContext)
	}

	public push(value: DataType<any>): void {
		this.executionContexts.current().operandStack.push(value)
	}

	public pop(): DataType<any> {
		return this.executionContexts.current().operandStack.pop()
	}

	public setLocal(value: DataType<any>, index: number): void {
		this.executionContexts.current().localVariables.set(value, index)
	}

	public getLocal(index: number): DataType<any> {
		return this.executionContexts.current().localVariables.get(index)
	}

	public currentMethodHasNext(): boolean {
		if (this.executionContexts.isEmpty()) return false
		return this.executionContexts.current().instructionStream.hasNext()
	}

	public currentMethodNext(): Instruction {
		return this.executionContexts.current().instructionStream.next()
	}

	public hasCurrentMethod(): boolean {
		return !this.executionContexts.isEmpty()
	}

	public currentMethod(): ExecutionContext {
		return this.executionContexts.current()
	}

	public currentPC(): number {
		return this.executionContexts.current().instructionStream.getPC()
	}

	public setPC(pc: number): void {
		this.executionContexts.current().instructionStream.setPC(pc)
	}

	public allCurrentLocals(): LocalVariables {
		return this.executionContexts.current().localVariables
	}

	public operandStackOverview(): string {
		return this.executionContexts.current().operandStack.getStackOverview()
	}

	public getBootstrapMethod(index: number): AttributeBootstrapMethodsBootstrapMethod {
		if (!this.bootstrapMethods) throw new Error(`Tried accessing non-existing bootstrap methods of ${this.getName()} @ ${index}`)
		return this.bootstrapMethods.data.bootstrapMethods[index]
	}

	public getVersion(): { major: number, minor: number } {
		return this.version
	}

	public getInternalStacktrace(): { class: string, method: string, pc: number }[] {
		const stacktrace: { class: string, method: string, pc: number }[] = []
		this.executionContexts.all().forEach(executionContext => {
			if (executionContext.instructionStream.hasNext()) {
				stacktrace.push({
					class: executionContext.methodObject.className,
					method: executionContext.methodObject.name,
					pc: executionContext.instructionStream.getPC()
				})
			}
		})
		return stacktrace
	}

	public initializeIfUninitialized(): void {
		if (ClassManager.it().getClassState(this.name) === ClassState.UNINITIALIZED) {
			this.initialize()
		}
	}

	public getAllFieldsInOrder(): [key: string, value: DataType<any>, isStatic: boolean, signature: string, modifiers: number][] {
		const ordered: [key: string, value: DataType<any>, isStatic: boolean, signature: string, modifiers: number][] = []
		for (const [key, value] of this.staticFields.entries()) {
			ordered[this.fieldIndices.get('[' + key)!] = [key, value, true, this.staticFieldSignatures.get(key)!, this.staticFieldModifiers.get(key)!]
		}
		return ordered
	}

	public getFieldSignature(key: string): string {
		return this.staticFieldSignatures.get(key)!
	}

	public getFieldModifiers(key: string): number {
		return this.staticFieldModifiers.get(key)!
	}

	public getMethods(): MethodObject[] {
		const methods = []
		for (const method of this.methods.values()) methods.push(method)
		return methods
	}

	public getAccessFlags(): number {
		return this.accessFlags
	}

	private constructMethodIdentifier(name: string, descriptor: string): string {
		return name + ' ' + descriptor
	}

	private setupNativeFunctionCall(method: MethodObject): void {
		const executionContext = this.newExecutionContext(method, true)
		this.executionContexts.push(executionContext)
	}

	private executeNativeFunctionCall(): void {
		const nativeClass = ClassManager.it().getNativeClassByName(this.currentMethod().methodObject.className)
		nativeClass.executeMethod(this.currentMethod().methodObject, this.currentMethod())
		if (this.currentMethod().methodObject.types.returnType) {
			ExecutionManager.it().setReturnValue(this.currentMethod().operandStack.pop())
		}
		ExecutionManager.it().returnFromFunction()
	}

	private newExecutionContext(method: MethodObject, isNative: boolean = false): ExecutionContext {
		return {
			instructionStream: cloneDeep(method.instructionStream),
			operandStack: new OperandStack(method.maxStack, isNative),
			localVariables: new LocalVariables(method.maxLocals, isNative),
			methodObject: method,
			callerReference: new ReferenceType()
		}
	}

	private initialize(): void {
		if (this.methods.has(this.constructMethodIdentifier('<clinit>', '()V'))) {
			ClassManager.it().updateClassState(this, ClassState.INITIALIZING)
			ExecutionManager.it().setupExecuteOutOfOrder()
			ExecutionManager.it().setupFunctionCall(this, '<clinit>', '()V')
			ExecutionManager.it().executeFunctionCall(this)
			ExecutionManager.it().callExecuteOutOfOrder()
		}
		ClassManager.it().updateClassState(this, ClassState.INITIALIZED)
		this.getSuperClass()?.initializeIfUninitialized()
	}
}
