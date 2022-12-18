import { CPInfoTypes } from '../CPInfo.parser'
import { Lexer } from '../Lexer'
import { ConstantDynamic } from '../types/constants/ConstantDynamic'

export class ConstantDynamicParser {
	public static parse(lexer: Lexer): ConstantDynamic {
		const bootstrapMethodAttrIndex = lexer.read(2).toNumber()
		const nameAndTypeIndex = lexer.read(2).toNumber()

		return new ConstantDynamic({
			tag: CPInfoTypes.CONSTANT_Dynamic,
			bootstrapMethodAttrIndex,
			nameAndTypeIndex
		})
	}
}
