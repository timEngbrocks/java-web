import { AttributeInfoParser } from '../AttributeInfoParser'
import { Lexer } from '../Lexer'
import { ConstantResolver } from '../Parser'
import { AttributeInfoHeader } from '../types/AttributeInfo'
import { AttributeCode } from '../types/attributes/AttributeCode'

export class AttributeCodeParser {
	public static parse(lexer: Lexer, constantResolver: ConstantResolver, header: AttributeInfoHeader): AttributeCode {
		const maxStack = lexer.read(2).toNumber()
		const maxLocals = lexer.read(2).toNumber()
		const codeLength = lexer.read(4).toNumber()
		const code = lexer.read(codeLength)
		const exceptionTableLength = lexer.read(2).toNumber()
		const exceptionTable = []
		for (let i = 0; i < exceptionTableLength; i++) {
			const startPC = lexer.read(2).toNumber()
			const endPC = lexer.read(2).toNumber()
			const handlerPC = lexer.read(2).toNumber()
			const catchType = lexer.read(2).toNumber()
			exceptionTable.push({ startPC, endPC, handlerPC, catchType })
		}
		const attributesCount = lexer.read(2).toNumber()
		const attributes = AttributeInfoParser.parseMany(lexer, constantResolver, attributesCount)

		return new AttributeCode({
			header,
			maxStack,
			maxLocals,
			codeLength,
			code,
			exceptionTableLength,
			exceptionTable,
			attributesCount,
			attributes
		})
	}
}
