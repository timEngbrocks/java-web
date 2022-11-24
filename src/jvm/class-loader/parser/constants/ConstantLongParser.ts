import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../lexer'
import { ConstantLong } from '../types/constants/ConstantLong'

export class ConstantLongParser {
	public static parse(lexer: Lexer): ConstantLong {
		const highBytes = lexer.read(4).toNumber()
		const lowBytes = lexer.read(4).toNumber()

		const value = (BigInt(highBytes) << 32n) + BigInt(lowBytes)

		return new ConstantLong({
			tag: CPInfoTypes.CONSTANT_Double,
			value
		})
	}
}
