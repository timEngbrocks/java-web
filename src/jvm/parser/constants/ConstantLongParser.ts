import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantLong } from '../types/constants/ConstantLong'

export class ConstantLongParser {
	public static parse(lexer: Lexer): ConstantLong {
		const highBytes = lexer.read(4).toNumber()
		const lowBytes = lexer.read(4).toNumber()

		const value = (BigInt.asIntN(32, BigInt(highBytes)) << 32n) + BigInt(lowBytes)

		return new ConstantLong({
			tag: CPInfoTypes.CONSTANT_Double,
			value
		})
	}
}
