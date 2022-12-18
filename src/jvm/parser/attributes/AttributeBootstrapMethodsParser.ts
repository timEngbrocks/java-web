import { Lexer } from '../Lexer'
import { AttributeInfoHeader } from '../types/AttributeInfo'
import { AttributeBootstrapMethods } from '../types/attributes/AttributeBootstrapMethods'

export class AttributeBootstrapMethodsParser {
	public static parse(lexer: Lexer, header: AttributeInfoHeader): AttributeBootstrapMethods {
		const numBootstrapMethods = lexer.read(2).toNumber()

		const bootstrapMethods = []
		for (let i = 0; i < numBootstrapMethods; i++) {
			const bootstrapMethodRef = lexer.read(2).toNumber()
			const numBootstrapArguments = lexer.read(2).toNumber()
			const bootstrapArguments = []
			for (let j = 0; j < numBootstrapArguments; j++) {
				const bootstrapArgument = lexer.read(2).toNumber()
				bootstrapArguments.push(bootstrapArgument)
			}
			bootstrapMethods.push({
				bootstrapMethodRef,
				numBootstrapArguments,
				bootstrapArguments
			})
		}

		return new AttributeBootstrapMethods({
			header,
			numBootstrapMethods,
			bootstrapMethods
		})
	}
}
