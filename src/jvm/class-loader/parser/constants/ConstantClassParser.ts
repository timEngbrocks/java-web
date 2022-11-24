import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../lexer'
import { ConstantClass } from '../types/constants/ConstantClass'

export class ConstantClassParser {
	public static parseMany(lexer: Lexer, count: number): ConstantClass[] {
		const result: ConstantClass[] = []
		for (let i = 0; i < count; i++) {
			result.push(ConstantClassParser.parse(lexer))
		}
		return result
	}

	public static parse(lexer: Lexer): ConstantClass {
		const nameIndex = lexer.read(2).toNumber()

		return new ConstantClass({
			tag: CPInfoTypes.CONSTANT_Class,
			nameIndex
		})
	}
}
