import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantMethodType } from '../types/constants/ConstantMethodType'

export class ConstantMethodTypeParser {
	public static parse(lexer: Lexer): ConstantMethodType {
		const descriptorIndex = lexer.read(2).toNumber()

		return new ConstantMethodType({
			tag: CPInfoTypes.CONSTANT_MethodType,
			descriptorIndex
		})
	}
}
