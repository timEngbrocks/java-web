import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../lexer'
import { ConstantUtf8 } from '../types/constants/ConstantUtf8'

export class ConstantUtf8Parser {
	public static parse(lexer: Lexer): ConstantUtf8 {
		const length = lexer.read(2).toNumber()
		const bytes = lexer.read(length)

		return new ConstantUtf8({
			tag: CPInfoTypes.CONSTANT_Utf8,
			length,
			bytes
		})
	}
}
