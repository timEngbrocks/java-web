
import { Interpreter } from '../Interpreter'
import type { HeapAddress } from '../memory/HeapAddress'
import { DescriptorType } from './DescriptorType'

export interface Reference {
	address: HeapAddress | null
	name: string
}

export class ReferenceType extends DescriptorType<Reference> {
	private readonly creationTime: number
	constructor(protected override value: Reference = { address: null, name: 'uninitialized' }) {
		super(value)
		this.creationTime = Interpreter.globalPC
	}

	public override toString(): string { return `referenceType: ${this.value.address?.getType()} -> '${this.value.name}' (${this.creationTime})` }
	public override toPrintableString(): string { return 'a' }
}
