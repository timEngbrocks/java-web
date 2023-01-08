import type { ReferenceType } from '../data-types/ReferenceType'

export class InternalThreadGroup {
	private threads: { id: number, threadReference: ReferenceType }[] = []

	constructor(
		private readonly name: string,
		private readonly threadGroupReference: ReferenceType
	) {}

	public getName(): string {
		return this.name
	}

	public addThread(id: number, threadReference: ReferenceType): void {
		this.threads.push({ id, threadReference })
	}

	public removeThread(id: number): void {
		const index = this.threads.findIndex(thread => thread.id === id)
		this.threads = this.threads.splice(index, 1)
	}

	public getThreads(): { id: number, threadReference: ReferenceType }[] {
		return this.threads
	}

	public getThreadGroupReference(): ReferenceType {
		return this.threadGroupReference
	}
}
