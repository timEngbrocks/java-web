import assert from 'assert'
import type { ReferenceType } from '../data-types/ReferenceType'

export enum ThreadState {
	NEW,
	RUNNABLE,
	RUNNING,
	BLOCKED,
	WAITING,
	TIMED_WAITED,
	TERMINATED,
}

export const threadPriorities = {
	min: 1,
	normal: 5,
	max: 10
}

export class InternalThread {
	private state = ThreadState.NEW
	private priority = threadPriorities.normal

	constructor(
		private readonly id: number,
		private readonly name: string,
		private readonly threadGroupName: string,
		private readonly threadReference: ReferenceType,
		private readonly threadGroupReference: ReferenceType
	) {}

	public start(): void {
		assert(this.state === ThreadState.NEW)
		this.state = ThreadState.RUNNABLE
	}

	public getId(): number {
		return this.id
	}

	public getName(): string {
		return this.name
	}

	public getThreadGroupName(): string {
		return this.threadGroupName
	}

	public getPriority(): number {
		return this.priority
	}

	public setPriority(priority: number): void {
		assert(priority >= threadPriorities.min && priority <= threadPriorities.max)
		this.priority = priority
	}

	public getState(): ThreadState {
		return this.state
	}

	public getThreadReference(): ReferenceType {
		return this.threadReference
	}

	public getThreadGroupReference(): ReferenceType {
		return this.threadGroupReference
	}

	public isAlive(): boolean {
		return this.state !== ThreadState.NEW && this.state !== ThreadState.TERMINATED
	}
}
