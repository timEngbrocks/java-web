import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantMethodHandle } from '../types/constants/ConstantMethodHandle'

export class ConstantMethodHandleParser {
	public static parse(lexer: Lexer): ConstantMethodHandle {
		const referenceKind = lexer.read(1).toNumber()
		const referenceIndex = lexer.read(2).toNumber()

		return new ConstantMethodHandle({
			tag: CPInfoTypes.CONSTANT_MethodHandle,
			referenceKind,
			referenceIndex
		})
	}
}
