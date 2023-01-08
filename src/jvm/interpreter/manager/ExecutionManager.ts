import { ClassObject } from '../class/ClassObject'
import type { ExecutableInterface } from '../class/ExecutableInterface'
import type { DataType } from '../data-types/data-type'
import type { Instruction } from '../instructions/Instruction'
import type { InternalThread } from '../thread/InternalThread'
import type { ExecutionContext } from '../util/ExecutionContext'
import { Stack } from '../util/Stack'
import { DebugManager } from './DebugManager'

export class ExecutionManager {
	private static instance: ExecutionManager | undefined = undefined

	public static construct(executeCallback: () => void): void {
		ExecutionManager.instance = new ExecutionManager(executeCallback)
	}

	constructor(private readonly executeCallback: () => void) {}

	public static it(): ExecutionManager {
		return ExecutionManager.instance!
	}

	private executionStack = new Stack<ExecutableInterface>()
	private readonly executionStackHistory = new Stack<Stack<ExecutableInterface>>()

	private thread: InternalThread | undefined = undefined

	public switchToNewThread(thread: InternalThread): void {
		this.executionStack.clear()
		this.executionStackHistory.clear()
		this.thread = thread
	}

	public getThread(): InternalThread {
		return this.thread!
	}

	public setThread(thread: InternalThread): void {
		this.thread = thread
	}

	public current(): ExecutableInterface {
		return this.executionStack.current()
	}

	public hasCurrent(): boolean {
		return !this.executionStack.isEmpty()
	}

	public setupFunctionCall(classObject: ExecutableInterface, name: string, descriptor: string): void {
		const callerName = this.hasCurrent() ? this.current().getName() : 'empty execution stack'
		classObject.setupFunctionCall(name, descriptor, callerName)
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
		DebugManager.it().setLastClassNameAndId(`${previousClass.getName()}(${previousClass.getId()})`)
	}

	public currentMethodHasNext(): boolean {
		if (this.executionStack.isEmpty()) return false
		return this.current().currentMethodHasNext()
	}

	public currentMethodNext(): Instruction {
		DebugManager.it().setLastExecutionContext(this.current().currentMethod())
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

	public getExecutionStack(): Stack<ExecutableInterface> {
		return this.executionStack
	}

	public getExecutionStackHistory(): Stack<Stack<ExecutableInterface>> {
		return this.executionStackHistory
	}

	public addToCurrentExecutionStack(executable: ExecutableInterface): void {
		this.executionStack.push(executable)
	}

	public addNewExecutionStack(): void {
		this.executionStackHistory.push(this.executionStack)
		this.executionStack = new Stack<ExecutableInterface>()
	}

	public returnFromExecutionStack(): Stack<ExecutableInterface> {
		const previousStack = this.getExecutionStack()
		this.executionStack = this.getExecutionStackHistory().pop()
		return previousStack
	}

	public setupExecuteOutOfOrder(): void {
		ExecutionManager.it().addNewExecutionStack()
	}

	public setupExecuteOutOfOrderWithReturn(): void {
		this.setupExecuteOutOfOrder()
		ExecutionManager.it().addToCurrentExecutionStack(ClassObject.constructEmptyClassForReturn())
	}

	public callExecuteOutOfOrder(): Stack<ExecutableInterface> {
		this.executeCallback()
		return ExecutionManager.it().returnFromExecutionStack()
	}
}
