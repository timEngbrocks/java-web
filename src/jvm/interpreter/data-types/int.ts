import { IntegralType } from './data-type'

export class int extends IntegralType {
	static MAX = 2147483647
	static MIN = -2147483648

	public override set(value: number): void {
		if (value <= int.MAX && value >= int.MIN) this.value = value
		else throw new Error(`invalid int assignment: ${value}`)
	}

	public override toString(): string { return `${this.value} (int)` }
}
