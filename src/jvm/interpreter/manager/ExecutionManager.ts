import { ClassObject } from '../class/ClassObject'
import type { ExecutableInterface } from '../class/ExecutableInterface'
import type { DataType } from '../data-types/data-type'
import type { Instruction } from '../instructions/Instruction'
import type { ExecutionContext } from '../util/ExecutionContext'
import type { Stack } from '../util/Stack'
import { DebugManager } from './DebugManager'
import { ThreadManager } from './ThreadManager'

export class ExecutionManager {
	private static instance: ExecutionManager | undefined = undefined

	public static construct(executeCallback: () => void): void {
		ExecutionManager.instance = new ExecutionManager(executeCallback)
	}

	private constructor(private readonly executeCallback: () => void) {}

	public static it(): ExecutionManager {
		return ExecutionManager.instance!
	}

	public current(): ExecutableInterface {
		return ThreadManager.it().current().currentExecution()
	}

	public hasCurrent(): boolean {
		return ThreadManager.it().current().hasCurrentExecution()
	}

	public setupFunctionCall(classObject: ExecutableInterface, name: string, descriptor: string): void {
		const callerName = this.hasCurrent() ? this.current().getName() : 'empty execution stack'
		classObject.setupFunctionCall(name, descriptor, callerName)
	}

	public executeFunctionCall(classObject: ExecutableInterface): void {
		ThreadManager.it().current().pushExecutionStack(classObject)
		classObject.executeFunctionCall()
	}

	public setReturnValue(value: DataType<any>): void {
		const clazz = ThreadManager.it().current().popExecutionStack()
		if (clazz.getId() === ThreadManager.it().current().currentExecution().getId()) {
			ThreadManager.it().current().currentExecution().setReturnValueOnSelf(value)
		} else {
			ThreadManager.it().current().currentExecution().push(value)
		}
		ThreadManager.it().current().pushExecutionStack(clazz)
	}

	public returnFromFunction(): void {
		this.current().returnFromFunction()
		const previousClass = ThreadManager.it().current().popExecutionStack()
		DebugManager.it().setLastClassNameAndId(`${previousClass.getName()}(${previousClass.getId()})`)
	}

	public currentMethodHasNext(): boolean {
		if (!ThreadManager.it().current().hasCurrentExecution()) return false
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

	public addToCurrentExecutionStack(executable: ExecutableInterface): void {
		ThreadManager.it().current().pushExecutionStack(executable)
	}

	public addNewExecutionStack(): void {
		ThreadManager.it().current().storeCurrentExecutionStack()
	}

	public returnFromExecutionStack(): Stack<ExecutableInterface> {
		return ThreadManager.it().current().restoreLastExecutionStack()
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
