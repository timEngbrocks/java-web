import { randomUUID } from 'crypto'
import { cloneDeep } from 'lodash'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import type { AttributeBootstrapMethodsBootstrapMethod } from '../../parser/types/attributes/AttributeBootstrapMethods'
import type { CPInfo } from '../../parser/types/CPInfo'
import type { DataType } from '../data-types/data-type'
import { ReferenceType } from '../data-types/ReferenceType'
import type { Instruction } from '../instructions/Instruction'
import { ClassManager } from '../manager/ClassManager'
import { ExecutionManager } from '../manager/ExecutionManager'
import { RuntimeManager } from '../manager/RuntimeManager'
import { HEAP_TYPES } from '../memory/HeapTypes'
import { LocalVariables } from '../memory/LocalVariables'
import { OperandStack } from '../memory/operand-stack'
import type { ExecutionContext } from '../util/ExecutionContext'
import type { MethodObject } from '../util/MethodObject'
import { Stack } from '../util/Stack'
import type { ClassObject } from './ClassObject'
import type { ExecutableInterface } from './ExecutableInterface'
import type { InterfaceObject } from './InterfaceObject'

export class ClassInstance implements ExecutableInterface {
	private readonly fields: Map<string, DataType<any>>
	protected readonly executionContexts = new Stack<ExecutionContext>()
	private readonly fieldIndices = new Map<string, number>()

	constructor(private readonly classObject: ClassObject, private readonly id = randomUUID()) {
		this.fields = classObject.getFields()
		let fieldCounter = 0
		for (const key of this.fields.keys()) this.fieldIndices.set(key, fieldCounter++)
	}

	public getName(): string {
		return this.classObject.getName()
	}

	public getId(): string {
		return this.id
	}

	public constant(index: number): CPInfo<any> {
		return this.classObject.constant(index)
	}

	public hasMain(): boolean {
		return this.classObject.hasMain()
	}

	public getStaticField(name: string): DataType<any> {
		return this.classObject.getStaticField(name)
	}

	public putStaticField(name: string, value: DataType<any>): void {
		this.classObject.putStaticField(name, value)
	}

	public getField(name: string): DataType<any> {
		const value = this.fields.get(name)
		if (!value && !this.getSuperClass()) throw new Error(`Could not find field ${name} on ${this.classObject.getName()}`)
		else if (!value) return this.getSuperClass()!.getField(name)
		else if (value instanceof ReferenceType && value.get().address?.getType() === HEAP_TYPES.UNRESOLVED_CLASS_OR_INTERFACE) {
			RuntimeManager.it().load(value)
			return value
		}
		return value
	}

	public putField(name: string, value: DataType<any>): void {
		if (!this.fields.has(name) && !this.getSuperClass()) throw new Error(`No field named ${name} on ${this.classObject.getName()}`)
		else if (!this.fields.has(name)) this.getSuperClass()?.putField(name, value)
		this.fields.set(name, value)
	}

	public getClass(): ClassObject {
		return this.classObject
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

	public jumpByOffset(offset: number): void {
		this.executionContexts.current().instructionStream.setOffset(offset)
	}

	public setupFunctionCall(name: string, descriptor: string, callerName: string): void {
		const method = this.classObject.getMethod(name, descriptor)
		if (method.accessFlags & MethodAccessFlags.ACC_NATIVE) this.setupNativeFunctionCall(method)
		else if (method.accessFlags & MethodAccessFlags.ACC_STATIC) {
			this.classObject.setupFunctionCall(name, descriptor, callerName)
			this.executionContexts.push(this.newExecutionContext(method))
		} else {
			this.executionContexts.push(this.newExecutionContext(method))
		}
	}

	public executeFunctionCall(): void {
		if (this.currentMethod().operandStack.isNative) this.executeNativeFunctionCall()
		else {
			if (this.currentMethod().methodObject.accessFlags & MethodAccessFlags.ACC_STATIC) {
				this.executionContexts.pop()
				this.classObject.executeFunctionCall()
			}
		}
	}

	public returnFromFunction(): void {
		this.executionContexts.pop()
	}

	public setReturnValueOnSelf(value: DataType<any>): void {
		const currentContext = this.executionContexts.pop()
		this.push(value)
		this.executionContexts.push(currentContext)
	}

	public getMethod(name: string, descriptor: string): MethodObject {
		return this.classObject.getMethod(name, descriptor)
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

	public getSuperClass(): ClassInstance | undefined {
		return this.classObject.getSuperClass()
	}

	public getSuperInterfaces(): Set<InterfaceObject> {
		return this.classObject.getSuperInterfaces()
	}

	public hasSuperInterface(superInterface: InterfaceObject): boolean {
		return this.classObject.hasSuperInterface(superInterface)
	}

	public getFields(): Map<string, DataType<any>> {
		return this.fields
	}

	public getStaticFields(): Map<string, DataType<any>> {
		return this.classObject.getStaticFields()
	}

	public getBootstrapMethod(index: number): AttributeBootstrapMethodsBootstrapMethod {
		return this.classObject.getBootstrapMethod(index)
	}

	public getVersion(): { major: number, minor: number } {
		return this.classObject.getVersion()
	}

	public getInternalStacktrace(): { class: string, method: string, pc: number }[] {
		return this.classObject.getInternalStacktrace()
	}

	public initializeIfUninitialized(): void {
		this.classObject.initializeIfUninitialized()
	}

	public getAllFieldsInOrder(): [key: string, value: DataType<any>, isStatic: boolean, signature: string, modifiers: number][] {
		const ordered: [key: string, value: DataType<any>, isStatic: boolean, signature: string, modifiers: number][] = this.classObject.getAllFieldsInOrder()
		for (const [key, value] of this.fields.entries()) {
			ordered[this.fieldIndices.get(key)!] = [key, value, false, this.classObject.getFieldSignature(key, false), this.classObject.getFieldModifiers(key, false)]
		}
		return ordered
	}

	public getMethods(): MethodObject[] {
		return this.classObject.getMethods()
	}

	public getAccessFlags(): number {
		return this.classObject.getAccessFlags()
	}

	private newExecutionContext(method: MethodObject, isNative: boolean = false): ExecutionContext {
		const thisReference = RuntimeManager.it().allocate(this)
		const executionContext: ExecutionContext = {
			instructionStream: cloneDeep(method.instructionStream),
			operandStack: new OperandStack(method.maxStack, isNative),
			localVariables: new LocalVariables(method.maxLocals, isNative),
			methodObject: method,
			callerReference: thisReference
		}
		executionContext.localVariables.set(thisReference, 0)
		return executionContext
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
}
