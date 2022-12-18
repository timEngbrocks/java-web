import { ConstantClassParser } from '../constants/ConstantClassParser'
import { Lexer } from '../Lexer'
import { AttributeInfoHeader } from '../types/AttributeInfo'
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
