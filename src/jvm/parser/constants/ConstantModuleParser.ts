import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantModule } from '../types/constants/ConstantModule'

export class ConstantModuleParser {
	public static parseMany(lexer: Lexer, count: number): ConstantModule[] {
		const result: ConstantModule[] = []
		for (let i = 0; i < count; i++) {
			result.push(ConstantModuleParser.parse(lexer))
		}
		return result
	}

	public static parse(lexer: Lexer): ConstantModule {
		const nameIndex = lexer.read(2).toNumber()

		return new ConstantModule({
			tag: CPInfoTypes.CONSTANT_Class,
			nameIndex
		})
	}
}
