import { PrimitiveType } from './PrimitiveType'

export class ReturnAddressType extends PrimitiveType {
	constructor(protected override value: number = -1) {
		super(value)
	}
}
