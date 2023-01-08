
import type { DataType } from './data-type'
import { DescriptorType } from './DescriptorType'
import { ReferenceType } from './ReferenceType'

export class ArrayType extends DescriptorType<Array<ReferenceType>> {
	constructor(public type: DataType<any>, protected length = 0) {
		super(new Array<ReferenceType>(length).fill(new ReferenceType({ address: null, name: `[${type.toString()}` })))
	}

	public override toString(): string { return `array ${this.type.toString()}` }
	public override toPrintableString(): string { return 'array' }
}
