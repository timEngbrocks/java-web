import { CPInfo } from '../parser/types/CPInfo'
import { ClassInterface } from './class/ClassInterface'
import { ClassObjectManager } from './class/ClassObjectManager'
import { DataType, DescriptorType } from './data-types/data-type'
import { Instruction } from './instructions/Instruction'
import { InstructionStream } from './instructions/InstructionStream'
import { Heap, HeapAddress, HeapData } from './memory/heap'
import { LocalVariables } from './memory/LocalVariables'
import { OperandStack } from './memory/operand-stack'
import { ExecutionContext } from './util/ExecutionContext'
import { Stack } from './util/Stack'

export class Runtime {
	private static _instance: Runtime

	private readonly heap: Heap = new Heap()
	private readonly executeCallback: () => void = (): void => {}

	private classStack = new Stack<ClassInterface>()
	private readonly classStackHistory = new Stack<Stack<ClassInterface>>()

	private debug_lastExecutionContext = {
		instructionStream: new InstructionStream(''),
		operandStack: new OperandStack(0, false),
		localVariables: new LocalVariables(0, false),
		methodObject: {
			name: '',
			descriptor: '',
			className: '',
			accessFlags: 0,
			types: {
				parameters: [] as DescriptorType<any>[],
				returnType: undefined as (DescriptorType<any> | undefined)
			},
			maxLocals: 0,
			maxStack: 0,
			instructionStream: new InstructionStream('')
		}
	}

	private debug_lastClassNameAndId = ''

	constructor(executeCallback: () => void) {
		this.executeCallback = executeCallback
		Runtime._instance = this
	}

	public static it(): Runtime {
		return Runtime._instance
	}

	public current(): ClassInterface {
		return this.classStack.current()
	}

	public constant(index: number): CPInfo<any> {
		return this.current().constant(index)
	}

	public push(value: DataType<any>): void {
		this.current().push(value)
	}

	public pop(): DataType<any> {
		return this.current().pop()
	}

	public setLocal(value: DataType<any>, index: number): void {
		this.current().setLocal(value, index)
	}

	public getLocal(index: number): DataType<any> {
		return this.current().getLocal(index)
	}

	public allCurrentLocals(): LocalVariables {
		return this.classStack.current().allCurrentLocals()
	}

	public setupExecuteOutOfOrder(): void {
		this.classStackHistory.push(this.classStack)
		this.classStack = new Stack<ClassInterface>()
	}

	public callExecuteOutOfOrder(): void {
		this.executeCallback()
		this.classStack = this.classStackHistory.pop()
	}

	public allocate(value: HeapData): HeapAddress {
		return this.heap.allocate(value)
	}

	public load(address: HeapAddress): HeapData {
		return this.heap.load(address)
	}

	public setupFunctionCall(classObject: ClassInterface, name: string, descriptor: string): void {
		classObject.setupFunctionCall(name, descriptor)
	}

	public executeFunctionCall(classObject: ClassInterface): void {
		this.classStack.push(classObject)
		classObject.executeFunctionCall()
	}

	public setReturnValue(value: DataType<any>): void {
		const clazz = this.classStack.pop()
		if (clazz.getId() === this.classStack.current().getId()) {
			this.classStack.current().setReturnValueOnSelf(value)
		} else {
			this.classStack.current().push(value)
		}
		this.classStack.push(clazz)
	}

	public returnFromFunction(): void {
		this.current().returnFromFunction()
		const previousClass = this.classStack.pop()
		this.debug_lastClassNameAndId = `${previousClass.getName()}(${previousClass.getId()})`
	}

	public currentMethodHasNext(): boolean {
		if (this.classStack.isEmpty()) return false
		return this.current().currentMethodHasNext()
	}

	public currentMethodNext(): Instruction {
		this.debug_lastExecutionContext = this.current().currentMethod()
		return this.current().currentMethodNext()
	}

	public currentMethod(): ExecutionContext {
		return this.current().currentMethod()
	}

	public currentName(): string {
		return this.current().getName()
	}

	public currentId(): string {
		return this.current().getId()
	}

	public currentPC(): number {
		return this.current().currentPC()
	}

	public jumpByOffset(offset: number): void {
		this.current().jumpByOffset(offset)
	}

	public setPC(pc: number): void {
		this.current().setPC(pc)
	}

	public getStatic(className: string, fieldName: string): DataType<any> {
		return ClassObjectManager.getClass(className).getStaticField(fieldName)
	}

	public putStatic(className: string, fieldName: string, value: DataType<any>): void {
		ClassObjectManager.getClass(className).putStaticField(fieldName, value)
	}

	public get_debug_lastClassNameAndId(): string {
		return this.debug_lastClassNameAndId
	}

	public get_debug_lastExecutionContext(): ExecutionContext {
		return this.debug_lastExecutionContext
	}
}
