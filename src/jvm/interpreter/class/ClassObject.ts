import { randomUUID } from 'crypto'
import { cloneDeep } from 'lodash'
import { getNativeClassByName } from '../../native/native'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import { CPInfo } from '../../parser/types/CPInfo'
import { DataType, ReferenceType } from '../data-types/data-type'
import { Instruction } from '../instructions/Instruction'
import { ConstantPool } from '../memory/constant-pool'
import { HEAP_TYPES } from '../memory/heap'
import { LocalVariables } from '../memory/LocalVariables'
import { OperandStack } from '../memory/operand-stack'
import { Runtime } from '../Runtime'
import { ExecutionContext } from '../util/ExecutionContext'
import { MethodObject } from '../util/MethodObject'
import { Stack } from '../util/Stack'
import { ClassInstance } from './ClassInstance'
import { ClassInterface } from './ClassInterface'
import { ClassObjectManager, ClassObjectState } from './ClassObjectManager'

export class ClassObject implements ClassInterface {
	private readonly executionContexts = new Stack<ExecutionContext>()
	private superClassInstance: ClassInstance | undefined
	private readonly superInterfacesInstances = new Set<ClassInstance>()

	public static constructEmptyClass(): ClassObject {
		return new ClassObject(
			'empty',
			new ConstantPool([]),
			new Map<string, DataType<any>>(),
			new Map<string, DataType<any>>(),
			new Map<string, MethodObject>(),
			undefined,
			new Set<string>()
		)
	}

	constructor(
		private readonly name: string,
		private readonly runtimeConstantPool: ConstantPool,
		private readonly staticFields: Map<string, DataType<any>>,
		private readonly fields: Map<string, DataType<any>>,
		private readonly methods: Map<string, MethodObject>,
		private readonly superClass: string | undefined,
		private readonly superInterfaces: Set<string>,
		private readonly id = randomUUID()
	) {}

	getClass(): ClassObject {
		return this
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

	public hasMain(): boolean {
		return this.methods.has(this.constructMethodIdentifier('main', '([Ljava/lang/String;)V'))
	}

	public getStaticField(name: string): DataType<any> {
		this.initializeIfUninitialized()
		const value = this.staticFields.get(name)
		if (!value) throw new Error(`Could not find static field ${name} on ${this.name}`)
		if (value instanceof ReferenceType && value.get()?.getType() === HEAP_TYPES.UNRESOLVED_CLASS) {
			const actualValue = Runtime.it().load(value.get()!) as DataType<any>
			this.putStaticField(name, actualValue)
			return actualValue
		}
		return value
	}

	public putStaticField(name: string, value: DataType<any>): void {
		this.initializeIfUninitialized()
		if (!this.staticFields.has(name)) throw new Error(`Static field ${name} does not exist on ${this.name}`)
		this.staticFields.set(name, value)
	}

	public getFields(): Map<string, DataType<any>> {
		return this.fields
	}

	public getMethod(name: string, descriptor: string): MethodObject {
		return this.findMethod(this.constructMethodIdentifier(name, descriptor))
	}

	public jumpByOffset(offset: number): void {
		this.executionContexts.current().instructionStream.setOffset(offset)
	}

	public setupFunctionCall(name: string, descriptor: string): void {
		const method = this.getMethod(name, descriptor)
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

	private newExecutionContext(method: MethodObject, isNative: boolean = false): ExecutionContext {
		return {
			instructionStream: cloneDeep(method.instructionStream),
			operandStack: new OperandStack(method.maxStack, isNative),
			localVariables: new LocalVariables(method.maxLocals, isNative),
			methodObject: method
		}
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

	public initializeIfUninitialized(): void {
		if (ClassObjectManager.getClassState(this.name) === ClassObjectState.UNINITIALIZED) {
			this.initialize()
		}
	}

	public getSuperClass(): ClassInstance | undefined {
		if (!this.superClass) return undefined
		if (!this.superClassInstance) {
			this.superClassInstance = ClassObjectManager.newInstance(this.superClass)
		}
		return this.superClassInstance
	}

	public getSuperInterfaces(): Set<ClassInstance> {
		if (this.superInterfacesInstances.size === 0) {
			for (const superInterface of this.superInterfaces.values()) {
				const superInterfaceInstance = ClassObjectManager.newInstance(superInterface)
				this.superInterfacesInstances.add(superInterfaceInstance)
			}
		}
		return this.superInterfacesInstances
	}

	public getField(name: string): DataType<any> {
		throw new Error(`Can not getField on ClassObject ${this.getName()}`)
	}

	public putField(name: string, value: DataType<any>): void {
		throw new Error(`Can not putField on ClassObject ${this.getName()}`)
	}

	private setupNativeFunctionCall(method: MethodObject): void {
		const executionContext = this.newExecutionContext(method, true)
		this.executionContexts.push(executionContext)
	}

	private executeNativeFunctionCall(): void {
		const nativeClass = getNativeClassByName(this.currentMethod().methodObject.className)
		nativeClass.executeMethod(this.currentMethod().methodObject, this.currentMethod())
		if (this.currentMethod().methodObject.types.returnType) {
			Runtime.it().setReturnValue(this.currentMethod().operandStack.pop())
		}
		Runtime.it().returnFromFunction()
	}

	private findMethod(methodIdentifier: string): MethodObject {
		let method = this.methods.get(methodIdentifier)
		if (!method && this.superClass) {
			const superClass = ClassObjectManager.getClass(this.superClass)
			method = superClass.findMethod(methodIdentifier)
		}
		if (!method) {
			for (const superInterfaceName of this.superInterfaces.keys()) {
				const superInterface = ClassObjectManager.getClass(superInterfaceName)
				method = superInterface.findMethod(methodIdentifier)
				if (method) return method
			}
		}
		if (!method) throw new Error(`Could not find method: ${methodIdentifier} on ${this.name}`)
		return method
	}

	private constructMethodIdentifier(name: string, descriptor: string): string {
		return name + ' ' + descriptor
	}

	private initialize(): void {
		if (this.methods.has(this.constructMethodIdentifier('<clinit>', '()V'))) {
			ClassObjectManager.updateClassState(this, ClassObjectState.INITIALIZING)
			Runtime.it().setupExecuteOutOfOrder()
			Runtime.it().setupFunctionCall(this, '<clinit>', '()V')
			Runtime.it().executeFunctionCall(this)
			Runtime.it().callExecuteOutOfOrder()
		}
		ClassObjectManager.updateClassState(this, ClassObjectState.INITIALIZED)
		const superClassObject = this.getSuperClass()
		if (superClassObject) {
			superClassObject.getClass().initializeIfUninitialized()
		}
		for (const superInterface of this.getSuperInterfaces()) {
			superInterface.getClass().initializeIfUninitialized()
		}
	}
}
