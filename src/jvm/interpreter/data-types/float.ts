import { FloatingPointType } from './data-type'

export class float extends FloatingPointType {
	static NaN = 5.104235503814077e+38
	static positiveInfinity = 3.402823669209385e+38
	static negativeInfinity = -3.402823669209385e+38

	static MAX_POSITIVE = 3.4028234663852886e+38
	static MIN_POSITIVE = 1.401298464324817e-45
	static MAX_NEGATIVE = -float.MAX_POSITIVE
	static MIN_NEGATIVE = -float.MIN_POSITIVE

	public override set(value: number): void {
		if (
			value === 0 ||
			(value > 0 && (value >= float.MIN_POSITIVE && value <= float.MAX_POSITIVE)) ||
			(value < 0 && (value >= float.MAX_NEGATIVE && value <= float.MIN_NEGATIVE)) ||
			value === float.NaN ||
			value === float.positiveInfinity ||
			value === float.negativeInfinity
		) {
			this.value = value
			return
		}
		throw new Error(`invalid float assignment: ${value}`)
	}

	public override toString(): string { return `${this.value} (float)` }
}
