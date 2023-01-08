import type { HEAP_TYPES } from './HeapTypes'

export class HeapAddress {
	constructor(private readonly value: number, private readonly type: HEAP_TYPES) {}
	public get(): number { return this.value }
	public getType(): HEAP_TYPES { return this.type }
}
