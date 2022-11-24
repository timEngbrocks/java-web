import { HeapAddress } from '../memory/heap'
import { DataType } from './data-type'

export class reference extends DataType<HeapAddress | null> {
	public isWide: boolean = false

	private value: HeapAddress | null = null
	public get(): HeapAddress | null {
		return this.value
	}

	public set(value: HeapAddress | null): void {
		this.value = value
	}

	public toString(): string { return `${this.value?.getType().toString()} (reference)` }
}
