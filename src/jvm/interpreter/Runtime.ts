import { CPInfo } from '../parser/types/CPInfo'
import { ClassObject } from './class/ClassObject'
import { ClassObjectManager } from './class/ClassObjectManager'
import { ExecutableInterface } from './class/ExecutableInterface'
import { DataType, DescriptorType, ReferenceType } from './data-types/data-type'
import { Instruction } from './instructions/Instruction'
import { InstructionStream } from './instructions/InstructionStream'
import { Interpreter } from './Interpreter'
import { Heap, HeapData } from './memory/heap'
import { LocalVariables } from './memory/LocalVariables'
import { OperandStack } from './memory/operand-stack'
import { ExecutionContext } from './util/ExecutionContext'
import { Stack } from './util/Stack'

export class Runtime {
	private static _instance: Runtime

	private readonly heap: Heap = new Heap()
	private readonly executeCallback: () => void = (): void => {}

	private executionStack = new Stack<ExecutableInterface>()
	private readonly executionStackHistory = new Stack<Stack<ExecutableInterface>>()

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
		},
		class: ClassObject.constructEmptyClass() as ExecutableInterface
	}

	private debug_lastClassNameAndId = ''

	constructor(executeCallback: () => void) {
		this.executeCallback = executeCallback
		Runtime._instance = this
	}

	public static it(): Runtime {
		return Runtime._instance
	}

	public current(): ExecutableInterface {
		return this.executionStack.current()
	}

	public constant(index: number): CPInfo<any> {
		const currentMethod = this.current().currentMethod()
		const currentMethodClassName = currentMethod.methodObject.className
		if (ClassObjectManager.isClass(currentMethodClassName)) {
			const currentMethodClass = ClassObjectManager.getClass(currentMethodClassName)
			return currentMethodClass.constant(index)
		} else {
			const currentMethodInterface = ClassObjectManager.getInterface(currentMethodClassName)
			return currentMethodInterface.constant(index)
		}
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
		return this.executionStack.current().allCurrentLocals()
	}

	public setupExecuteOutOfOrder(): void {
		this.executionStackHistory.push(this.executionStack)
		this.executionStack = new Stack<ExecutableInterface>()
	}

	public setupExecuteOutOfOrderWithReturn(): void {
		this.setupExecuteOutOfOrder()
		this.executionStack.push(ClassObject.constructEmptyClassForReturn())
	}

	public callExecuteOutOfOrder(): Stack<ExecutableInterface> {
		this.executeCallback()
		const outOfOrderClassStack = this.executionStack
		this.executionStack = this.executionStackHistory.pop()
		return outOfOrderClassStack
	}

	public allocate(value: HeapData): ReferenceType {
		return this.heap.allocate(value)
	}

	public load(reference: ReferenceType): HeapData {
		return this.heap.load(reference)
	}

	public setupFunctionCall(classObject: ExecutableInterface, name: string, descriptor: string): void {
		classObject.setupFunctionCall(name, descriptor)
	}

	public executeFunctionCall(classObject: ExecutableInterface): void {
		this.executionStack.push(classObject)
		classObject.executeFunctionCall()
	}

	public setReturnValue(value: DataType<any>): void {
		const clazz = this.executionStack.pop()
		if (clazz.getId() === this.executionStack.current().getId()) {
			this.executionStack.current().setReturnValueOnSelf(value)
		} else {
			this.executionStack.current().push(value)
		}
		this.executionStack.push(clazz)
	}

	public returnFromFunction(): void {
		this.current().returnFromFunction()
		const previousClass = this.executionStack.pop()
		this.debug_lastClassNameAndId = `${previousClass.getName()}(${previousClass.getId()})`
	}

	public currentMethodHasNext(): boolean {
		if (this.executionStack.isEmpty()) return false
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

	public debugValue(className: string, methodName: string, ...args: any[]): void {
		if (Runtime.it().current().getName() === className && Runtime.it().currentMethod().methodObject.name === methodName) console.log(Interpreter.globalPC, ...args)
	}

	public debugExpression(className: string, methodName: string, expression: (...args: any[]) => void, ...args: any[]): void {
		if (Runtime.it().current().getName() === className && Runtime.it().currentMethod().methodObject.name === methodName) {
			const originalLog = console.log
			console.log = (...args: any[]) => originalLog(Interpreter.globalPC, ...args)
			expression(...args)
			console.log = originalLog
		}
	}
}
