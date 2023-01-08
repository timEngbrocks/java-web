import { ConstantClassParser } from '../constants/ConstantClassParser'
import type { Lexer } from '../Lexer'
import type { AttributeInfoHeader } from '../types/AttributeInfo'
import { AttributeNestMembers } from '../types/attributes/AttributeNestMembers'

export class AttributeNestMembersParser {
	public static parse(lexer: Lexer, header: AttributeInfoHeader): AttributeNestMembers {
		const numberOfClasses = lexer.read(2).toNumber()
		const classes = ConstantClassParser.parseMany(lexer, numberOfClasses)

		return new AttributeNestMembers({
			header,
			numberOfClasses,
			classes
		})
	}
}
