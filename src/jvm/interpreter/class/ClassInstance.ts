import { randomUUID } from 'crypto'
import { cloneDeep } from 'lodash'
import { getNativeClassByName } from '../../native/native'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import { CPInfo } from '../../parser/types/CPInfo'
import { DataType, ReferenceType } from '../data-types/data-type'
import { Instruction } from '../instructions/Instruction'
import { HEAP_TYPES } from '../memory/heap'
import { LocalVariables } from '../memory/LocalVariables'
import { OperandStack } from '../memory/operand-stack'
import { Runtime } from '../Runtime'
import { ExecutionContext } from '../util/ExecutionContext'
import { MethodObject } from '../util/MethodObject'
import { Stack } from '../util/Stack'
import { ClassInterface } from './ClassInterface'
import { ClassObject } from './ClassObject'

export class ClassInstance implements ClassInterface {
	private readonly fields: Map<string, DataType<any>>
	protected readonly executionContexts = new Stack<ExecutionContext>()

	constructor(private readonly classObject: ClassObject, private readonly id = randomUUID()) {
		this.fields = classObject.getFields()
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
		if (!value) throw new Error(`Could not find field ${name} on ${this.classObject.getName()}`)
		if (value instanceof ReferenceType && value.get()?.getType() === HEAP_TYPES.UNRESOLVED_CLASS) {
			const actualValue = Runtime.it().load(value.get()!) as DataType<any>
			this.putField(name, actualValue)
			return actualValue
		}
		return value
	}

	public putField(name: string, value: DataType<any>): void {
		if (!this.fields.has(name)) throw new Error(`No field named ${name} on ${this.classObject.getName()}`)
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

	public setupFunctionCall(name: string, descriptor: string): void {
		const method = this.classObject.getMethod(name, descriptor)
		if (method.accessFlags & MethodAccessFlags.ACC_NATIVE) this.setupNativeFunctionCall(method)
		else if (method.accessFlags & MethodAccessFlags.ACC_STATIC) {
			this.classObject.setupFunctionCall(name, descriptor)
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

	public getSuperInterfaces(): Set<ClassInstance> {
		return this.classObject.getSuperInterfaces()
	}

	private newExecutionContext(method: MethodObject, isNative: boolean = false): ExecutionContext {
		const executionContext: ExecutionContext = {
			instructionStream: cloneDeep(method.instructionStream),
			operandStack: new OperandStack(method.maxStack, isNative),
			localVariables: new LocalVariables(method.maxLocals, isNative),
			methodObject: method
		}
		const address = Runtime.it().allocate(this)
		executionContext.localVariables.set(new ReferenceType(address, this.getName()), 0)
		return executionContext
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
}
