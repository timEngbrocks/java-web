import { IntegralType } from './data-type'

export class long extends IntegralType {
	public override isWide: boolean = true

	static MAX = 9223372036854775807n
	static MIN = -9223372036854775808n

	constructor(protected value: bigint = 0n) {
		super(value)
	}

	public override set(value: bigint): void {
		if (value <= long.MAX && value >= long.MIN) this.value = value
		else throw new Error(`invalid long assignment: ${value}`)
	}

	public override toString(): string { return `${this.value} (long)` }
}
