import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantPackage } from '../types/constants/ConstantPackage'

export class ConstantPackageParser {
	public static parseMany(lexer: Lexer, count: number): ConstantPackage[] {
		const result: ConstantPackage[] = []
		for (let i = 0; i < count; i++) {
			result.push(ConstantPackageParser.parse(lexer))
		}
		return result
	}

	public static parse(lexer: Lexer): ConstantPackage {
		const nameIndex = lexer.read(2).toNumber()

		return new ConstantPackage({
			tag: CPInfoTypes.CONSTANT_Class,
			nameIndex
		})
	}
}
