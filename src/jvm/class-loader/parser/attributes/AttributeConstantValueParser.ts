import { Lexer } from '../lexer'
import { AttributeInfoHeader } from '../types/AttributeInfo'
import { AttributeConstantValue } from '../types/attributes/AttributeConstantValue'

export class AttributeConstantValueParser {
	public static parse(lexer: Lexer, header: AttributeInfoHeader): AttributeConstantValue {
		const constantValueIndex = lexer.read(2).toNumber()

		return new AttributeConstantValue({
			header,
			constantValueIndex
		})
	}
}
