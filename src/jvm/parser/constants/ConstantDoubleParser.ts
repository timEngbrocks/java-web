import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantDouble } from '../types/constants/ConstantDouble'

export class ConstantDoubleParser {
	public static parse(lexer: Lexer): ConstantDouble {
		const highBytes = lexer.read(4).toNumber()
		const lowBytes = lexer.read(4).toNumber()
		const value = (BigInt(highBytes) << 32n) + BigInt(lowBytes)
		if (value === 0x7ff0000000000000n) {
			return new ConstantDouble({
				tag: CPInfoTypes.CONSTANT_Double,
				value: Number.POSITIVE_INFINITY
			})
		}
		if (value === 0xfff0000000000000n) {
			return new ConstantDouble({
				tag: CPInfoTypes.CONSTANT_Double,
				value: Number.NEGATIVE_INFINITY
			})
		}

		if ((value >= 0x7ff0000000000001n && value <= 0x7fffffffffffffffn) ||
            (value >= 0xfff0000000000001n && value <= 0xffffffffffffffffn)) {
			return new ConstantDouble({
				tag: CPInfoTypes.CONSTANT_Double,
				value: Number.NaN
			})
		}

		const s = ((value >> 63n) === 0n) ? 1 : -1
		const e = Number((value >> 52n) & 0x7ffn)
		const m = Number((e === 0)
			? (value & 0xfffffffffffffn) << 1n
			: (value & 0xfffffffffffffn) | 0x10000000000000n)

		return new ConstantDouble({
			tag: CPInfoTypes.CONSTANT_Double,
			value: s * m * Math.pow(2, e - 1075)
		})
	}
}
