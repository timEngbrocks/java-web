import { ReturnAddressType } from './data-type'

export class returnAddress extends ReturnAddressType {
	public override toString(): string { return `${this.value} (returnAddress)` }
}
