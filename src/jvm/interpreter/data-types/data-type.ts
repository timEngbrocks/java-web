export class DataType<T> {
	public isWide = false
	constructor(protected value?: T) {}
	public get(): T { return this.value! }
	public set(value: T): void { this.value = value }
	public toString(): string { return 'DataType' }
	public toPrintableString(): string { return 'DataType' }
}
