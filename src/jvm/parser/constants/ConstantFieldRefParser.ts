import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantFieldRef } from '../types/constants/ConstantFieldRef'

export class ConstantFieldRefParser {
	public static parse(lexer: Lexer): ConstantFieldRef {
		const classIndex = lexer.read(2).toNumber()
		const nameAndTypeIndex = lexer.read(2).toNumber()

		return new ConstantFieldRef({
			tag: CPInfoTypes.CONSTANT_Fieldref,
			classIndex,
			nameAndTypeIndex
		})
	}
}
