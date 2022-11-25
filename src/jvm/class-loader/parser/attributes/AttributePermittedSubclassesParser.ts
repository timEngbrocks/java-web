import { ConstantClassParser } from '../constants/ConstantClassParser'
import { Lexer } from '../Lexer'
import { AttributeInfoHeader } from '../types/AttributeInfo'
import { AttributePermittedSubclasses } from '../types/attributes/AttributePermittedSubclasses'

export class AttributePermittedSubclassesParser {
	public static parse(lexer: Lexer, header: AttributeInfoHeader): AttributePermittedSubclasses {
		const numberOfClasses = lexer.read(2).toNumber()
		const classes = ConstantClassParser.parseMany(lexer, numberOfClasses)

		return new AttributePermittedSubclasses({
			header,
			numberOfClasses,
			classes
		})
	}
}
