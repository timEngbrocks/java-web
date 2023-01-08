import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantFloat } from '../types/constants/ConstantFloat'

export class ConstantFloatParser {
	public static parse(lexer: Lexer): ConstantFloat {
		const value = lexer.read(4).toNumber()

		const s = ((value >> 31) === 0) ? 1 : -1
		const e = (value >> 23) & 0xff
		const m = (e === 0)
			? (value & 0x7fffff) << 1
			: (value & 0x7fffff) | 0x800000

		return new ConstantFloat({
			tag: CPInfoTypes.CONSTANT_Float,
			value: s * m * Math.pow(2, e - 150)
		})
	}
}
