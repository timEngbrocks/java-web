import { CPInfoTypes } from '../CPInfoTypes'
import type { Lexer } from '../Lexer'
import { ConstantInvokeDynamic } from '../types/constants/ConstantInvokeDynamic'

export class ConstantInvokeDynamicParser {
	public static parse(lexer: Lexer): ConstantInvokeDynamic {
		const bootstrapMethodAttrIndex = lexer.read(2).toNumber()
		const nameAndTypeIndex = lexer.read(2).toNumber()

		return new ConstantInvokeDynamic({
			tag: CPInfoTypes.CONSTANT_InvokeDynamic,
			bootstrapMethodAttrIndex,
			nameAndTypeIndex
		})
	}
}
