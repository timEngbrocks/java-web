import assert from 'assert'

export enum ThreadState {
	NEW,
	RUNNABLE,
	RUNNING,
	BLOCKED,
	WAITING,
	TIMED_WAITING,
	TERMINATED,
}

export const ThreadPriorities = {
	min: 1,
	normal: 5,
	max: 10
}

export class ThreadScheduler {
	private static instance: ThreadScheduler | undefined = undefined

	public static construct(): void {
		ThreadScheduler.instance = new ThreadScheduler()
	}

	public static it(): ThreadScheduler {
		return ThreadScheduler.instance!
	}

	private readonly newThreads = new Set<number>()
	private readonly runnableThreads = new Map<number, Set<number>>()
	private readonly blockedThreads = new Set<number>()
	private readonly waitingThreads = new Set<number>()
	private readonly timedWaitingThreads = new Set<number>()
	private readonly terminatedThreads = new Set<number>()

	private readonly threadPriorities = new Map<number, number>()
	private readonly threadStates = new Map<number, ThreadState>()

	private runningThread = 1

	private constructor() {
		for (let i = ThreadPriorities.min; i <= ThreadPriorities.max; i++) {
			this.runnableThreads.set(i, new Set<number>())
		}
	}

	public addNewThread(threadId: number): void {
		console.log('Adding new thread', threadId)
		this.newThreads.add(threadId)
		this.threadPriorities.set(threadId, ThreadPriorities.normal)
		this.threadStates.set(threadId, ThreadState.NEW)
	}

	public current(): number {
		return this.runningThread
	}

	public schedule(): void {
		console.log('Scheduling', this.runningThread)
		for (let i = ThreadPriorities.max; i >= ThreadPriorities.min; i--) {
			if (this.runnableThreads.get(i)!.size > 0) {
				const nextThread = this.runnableThreads.get(i)!.values().next().value
				this.removeRunnableThread(nextThread)
				this.threadStates.set(nextThread, ThreadState.RUNNING)
				this.runningThread = nextThread
			}
		}
		console.log('Scheduled', this.runningThread)
	}

	public start(threadId: number): void {
		assert(this.newThreads.has(threadId))
		this.newThreads.delete(threadId)
		this.addRunnableThread(threadId)
		this.threadStates.set(threadId, ThreadState.RUNNABLE)
	}

	public terminate(threadId: number): void {
		assert(this.runningThread === threadId)
		this.terminatedThreads.add(threadId)
		this.threadStates.set(threadId, ThreadState.TERMINATED)
	}

	public notifyAll(): void {
		for (const threadId of this.waitingThreads) {
			this.waitingThreads.delete(threadId)
			this.addRunnableThread(threadId)
			this.threadStates.set(threadId, ThreadState.RUNNABLE)
		}
	}

	public notify(threadId: number): void {
		if (this.waitingThreads.has(threadId)) {
			this.waitingThreads.delete(threadId)
			this.addRunnableThread(threadId)
			this.threadStates.set(threadId, ThreadState.RUNNABLE)
		}
	}

	public wait(threadId: number): void {
		assert(this.runningThread === threadId)
		this.waitingThreads.add(threadId)
		this.threadStates.set(threadId, ThreadState.WAITING)
		this.schedule()
	}

	public sleep(threadId: number, millis: number): void {
		assert(this.runningThread === threadId)
		this.timedWaitingThreads.add(threadId)
		setTimeout(() => {
			this.timerElapsed(threadId)
		}, millis)
		this.threadStates.set(threadId, ThreadState.TIMED_WAITING)
		this.schedule()
	}

	public waitTimed(threadId: number, millis: number): void {
		assert(this.runningThread === threadId)
		this.timedWaitingThreads.add(threadId)
		setTimeout(() => {
			this.timerElapsed(threadId)
		}, millis)
		this.threadStates.set(threadId, ThreadState.TIMED_WAITING)
		this.schedule()
	}

	public join(threadId: number, millis: number): void {
		assert(this.runningThread === threadId)
		this.timedWaitingThreads.add(threadId)
		setTimeout(() => {
			this.timerElapsed(threadId)
		}, millis)
		this.threadStates.set(threadId, ThreadState.TIMED_WAITING)
		this.schedule()
	}

	public blockThread(threadId: number): void {
		assert(this.runningThread === threadId)
		this.blockedThreads.add(threadId)
		this.threadStates.set(threadId, ThreadState.BLOCKED)
		this.schedule()
	}

	public unblockThread(threadId: number): void {
		assert(this.blockedThreads.has(threadId))
		this.blockedThreads.delete(threadId)
		this.addRunnableThread(threadId)
		this.threadStates.set(threadId, ThreadState.RUNNABLE)
	}

	public setThreadPriority(threadId: number, priority: number): void {
		assert(priority >= ThreadPriorities.min && priority <= ThreadPriorities.max)
		this.threadPriorities.set(threadId, priority)
	}

	public getThreadPriority(threadId: number): number {
		return this.threadPriorities.get(threadId)!
	}

	public getThreadState(threadId: number): ThreadState {
		return this.threadStates.get(threadId)!
	}

	private timerElapsed(threadId: number): void {
		this.timedWaitingThreads.delete(threadId)
		this.addRunnableThread(threadId)
	}

	private addRunnableThread(threadId: number): void {
		const priority = this.getThreadPriority(threadId)
		this.runnableThreads.get(priority)!.add(threadId)
	}

	private removeRunnableThread(threadId: number): void {
		const priority = this.getThreadPriority(threadId)
		this.runnableThreads.get(priority)!.delete(threadId)
	}
}
