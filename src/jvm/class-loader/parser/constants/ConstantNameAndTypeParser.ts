import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantNameAndType } from '../types/constants/ConstantNameAndType'

export class ConstantNameAndTypeParser {
	public static parse(lexer: Lexer): ConstantNameAndType {
		const nameIndex = lexer.read(2).toNumber()
		const descriptorIndex = lexer.read(2).toNumber()

		return new ConstantNameAndType({
			tag: CPInfoTypes.CONSTANT_NameAndType,
			nameIndex,
			descriptorIndex
		})
	}
}
