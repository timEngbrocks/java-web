import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantString } from '../types/constants/ConstantString'

export class ConstantStringParser {
	public static parse(lexer: Lexer): ConstantString {
		const stringIndex = lexer.read(2).toNumber()

		return new ConstantString({
			tag: CPInfoTypes.CONSTANT_String,
			stringIndex
		})
	}
}
