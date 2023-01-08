import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantMethodRef } from '../types/constants/ConstantMethodRef'

export class ConstantMethodRefParser {
	public static parse(lexer: Lexer): ConstantMethodRef {
		const classIndex = lexer.read(2).toNumber()
		const nameAndTypeIndex = lexer.read(2).toNumber()

		return new ConstantMethodRef({
			tag: CPInfoTypes.CONSTANT_Methodref,
			classIndex,
			nameAndTypeIndex
		})
	}
}
