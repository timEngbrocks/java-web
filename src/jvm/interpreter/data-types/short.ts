import { IntegralType } from './data-type'

export class short extends IntegralType {
	static MAX = 32767
	static MIN = -32768

	public override set(value: number): void {
		if (value <= short.MAX && value >= short.MIN) this.value = value
		else throw new Error(`invalid short assignment: ${value}`)
	}

	public override toString(): string { return `${this.value} (short)` }
}
