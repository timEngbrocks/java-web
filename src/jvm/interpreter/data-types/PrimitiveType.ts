import { DescriptorType } from './DescriptorType'

export class PrimitiveType extends DescriptorType<number | bigint> {
	constructor(protected override value: number | bigint = 0) {
		super(value)
	}
}
