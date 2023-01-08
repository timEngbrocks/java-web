import { ReturnAddressType } from './ReturnAddressType'

export class returnAddress extends ReturnAddressType {
	public override toString(): string { return `${this.value} (returnAddress)` }
	public override toPrintableString(): string { return 'returnAddress' }
}
