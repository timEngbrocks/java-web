import { AttributeBootstrapMethodsParser } from './attributes/AttributeBootstrapMethodsParser'
import { AttributeCodeParser } from './attributes/AttributeCodeParser'
import { AttributeConstantValueParser } from './attributes/AttributeConstantValueParser'
import { AttributeNestHostParser } from './attributes/AttributeNestHostParser'
import { AttributeNestMembersParser } from './attributes/AttributeNestMembersParser'
import { AttributePermittedSubclassesParser } from './attributes/AttributePermittedSubclassesParser'
import type { ConstantResolver } from './ConstantResolver'
import type { Lexer } from './Lexer'
import { AttributeInfo } from './types/AttributeInfo'
import { AttributeCode } from './types/attributes/AttributeCode'
import type { ConstantUtf8 } from './types/constants/ConstantUtf8'

export class AttributeInfoParser {
	public static parseMany(lexer: Lexer, constantResolver: ConstantResolver, count: number): AttributeInfo<any>[] {
		const result: AttributeInfo<any>[] = []
		for (let i = 0; i < count; i++) {
			result.push(AttributeInfoParser.parse(lexer, constantResolver))
		}
		return result
	}

	public static parse(lexer: Lexer, constantResolver: ConstantResolver): AttributeInfo<any> {
		const attributeNameIndex = lexer.read(2).toNumber()
		const attributeLength = lexer.read(4).toNumber()
		const header = { attributeNameIndex, attributeLength }

		const attributeName = (constantResolver.resolve(attributeNameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		switch (attributeName) {
			case 'Code': {
				const attributeCodeData = AttributeCodeParser.parse(lexer, constantResolver, header)
				const attributes = AttributeInfoParser.parseMany(lexer, constantResolver, attributeCodeData.attributesCount)
				return new AttributeCode({ ...attributeCodeData, attributes })
			}
			case 'ConstantValue': return AttributeConstantValueParser.parse(lexer, header)
			case 'BootstrapMethods': return AttributeBootstrapMethodsParser.parse(lexer, header)
			case 'NestHost': return AttributeNestHostParser.parse(lexer, header)
			case 'NestMembers': return AttributeNestMembersParser.parse(lexer, header)
			case 'PermittedSubclasses': return AttributePermittedSubclassesParser.parse(lexer, header)
			default: {
				// console.debug(`Unimplemented attribute: ${attributeName} with length: ${attributeLength}`)
				lexer.read(attributeLength)
			}
		}

		return new AttributeInfo({
			header
		})
	}
}
