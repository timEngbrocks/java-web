import { IntegralType } from './data-type'

export class char extends IntegralType {
	static MAX = 65535
	static MIN = 0

	public override set(value: number): void {
		if (value <= char.MAX && value >= char.MIN) this.value = value
		else throw new Error(`invalid char assignment: ${value}`)
	}

	public override toString(): string { return `${this.value} (char)` }
}
