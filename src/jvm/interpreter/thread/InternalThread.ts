import type { ExecutableInterface } from '../class/ExecutableInterface'
import type { ReferenceType } from '../data-types/ReferenceType'
import { ThreadScheduler, ThreadState } from '../manager/ThreadScheduler'
import { Stack } from '../util/Stack'

export class InternalThread {
	private executionStack = new Stack<ExecutableInterface>()
	private readonly executionStackHistory = new Stack<Stack<ExecutableInterface>>()

	constructor(
		private readonly id: number,
		private readonly name: string,
		private readonly threadGroupName: string | undefined,
		private readonly threadReference: ReferenceType,
		private readonly threadGroupReference: ReferenceType | undefined
	) {}

	public currentExecution(): ExecutableInterface {
		return this.executionStack.current()
	}

	public hasCurrentExecution(): boolean {
		return !this.executionStack.isEmpty()
	}

	public pushExecutionStack(classObject: ExecutableInterface): void {
		this.executionStack.push(classObject)
	}

	public popExecutionStack(): ExecutableInterface {
		return this.executionStack.pop()
	}

	public storeCurrentExecutionStack(): void {
		this.executionStackHistory.push(this.executionStack)
		this.executionStack = new Stack<ExecutableInterface>()
	}

	public restoreLastExecutionStack(): Stack<ExecutableInterface> {
		const previousStack = this.executionStack
		this.executionStack = this.executionStackHistory.pop()
		return previousStack
	}

	public getExecutionStack(): Stack<ExecutableInterface> {
		return this.executionStack
	}

	public getExecutionStackHistory(): Stack<Stack<ExecutableInterface>> {
		return this.executionStackHistory
	}

	public getId(): number {
		return this.id
	}

	public getName(): string {
		return this.name
	}

	public getThreadGroupName(): string | undefined {
		return this.threadGroupName
	}

	public getThreadReference(): ReferenceType {
		return this.threadReference
	}

	public getThreadGroupReference(): ReferenceType | undefined {
		return this.threadGroupReference
	}

	public isAlive(): boolean {
		const state = ThreadScheduler.it().getThreadState(this.id)
		return state !== ThreadState.NEW && state !== ThreadState.TERMINATED
	}
}
