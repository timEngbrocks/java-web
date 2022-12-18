export class Stack<T> {
	private readonly stack: T[] = []

	public push(value: T): void {
		this.stack.push(value)
	}

	public pop(): T {
		if (this.isEmpty()) throw new Error('Can not pop empty stack')
		return this.stack.pop()!
	}

	public current(): T {
		if (this.isEmpty()) throw new Error('Stack is empty')
		return this.stack.at(-1)!
	}

	public isEmpty(): boolean {
		return this.stack.length === 0
	}

	public length(): number {
		return this.stack.length
	}
}
