import { FloatingPointType } from './data-type'

export class double extends FloatingPointType {
	public override isWide = true

	static NaN_upper = 0x7fffffffffffffffn
	static NaN_lower = 0x7ff0000000000001n
	static NaN = double.NaN_lower
	static positiveInfinity = 0x7ff0000000000000n
	static negativeInfinity = 0xfff0000000000000n

	public static isNaN(value: double): boolean {
		return value.isNaN()
	}

	public override toString(): string { return `${this.value} (double)` }

	public isNaN(): boolean {
		return this.value >= double.NaN_lower && this.value <= double.NaN_upper
	}
}
