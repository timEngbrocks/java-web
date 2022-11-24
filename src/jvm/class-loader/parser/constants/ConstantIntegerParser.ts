import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../lexer'
import { ConstantInteger } from '../types/constants/ConstantInteger'

export class ConstantIntegerParser {
	public static parse(lexer: Lexer): ConstantInteger {
		const value = lexer.read(4).toNumber()

		return new ConstantInteger({
			tag: CPInfoTypes.CONSTANT_Integer,
			value
		})
	}
}
