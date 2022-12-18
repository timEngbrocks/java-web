import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantInterfaceMethodRef } from '../types/constants/ConstantInterfaceMethodRef'

export class ConstantInterfaceMethodRefParser {
	public static parse(lexer: Lexer): ConstantInterfaceMethodRef {
		const classIndex = lexer.read(2).toNumber()
		const nameAndTypeIndex = lexer.read(2).toNumber()

		return new ConstantInterfaceMethodRef({
			tag: CPInfoTypes.CONSTANT_InterfaceMethodref,
			classIndex,
			nameAndTypeIndex
		})
	}
}
