import { FloatingPointType } from './data-type'

export class float extends FloatingPointType<number> {
	public isWide: boolean = false

	static NaN = Number.NaN
	static positiveInfinity = Number.POSITIVE_INFINITY
	static negativeInfinity = Number.NEGATIVE_INFINITY

	static MAX_POSITIVE = 3.40282347 * Math.pow(10, 38)
	static MIN_POSITIVE = 1.40239846 * Math.pow(10, -45)
	static MAX_NEGATIVE = -float.MAX_POSITIVE
	static MIN_NEGATIVE = -float.MIN_POSITIVE

	private value: number = 0
	public get(): number {
		return this.value
	}

	public set(value: number): void {
		if (((value > 0 && (value > float.MAX_POSITIVE || value < float.MIN_POSITIVE)) || (value < 0 && (value < float.MAX_NEGATIVE || value > float.MIN_NEGATIVE))) && value !== 0) {
			throw `invalid float assignment: ${value}`
		}
		this.value = value
	}

	public toString(): string { return `${this.value} (float)` }
}
