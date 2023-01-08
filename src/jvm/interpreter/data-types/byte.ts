import { IntegralType } from './IntegralType'

export class byte extends IntegralType {
	static MAX = 127
	static MIN = -128

	public override set(value: number): void {
		if (value <= byte.MAX && value >= byte.MIN) this.value = value
		else throw new Error(`invalid byte assignment: ${value}`)
	}

	public override toString(): string { return `${this.value} (byte)` }
	public override toPrintableString(): string { return 'b' }
}
