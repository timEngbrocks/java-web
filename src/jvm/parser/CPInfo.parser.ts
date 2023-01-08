import { ConstantClassParser } from './constants/ConstantClassParser'
import { ConstantDoubleParser } from './constants/ConstantDoubleParser'
import { ConstantDynamicParser } from './constants/ConstantDynamicParser'
import { ConstantFieldRefParser } from './constants/ConstantFieldRefParser'
import { ConstantFloatParser } from './constants/ConstantFloatParser'
import { ConstantIntegerParser } from './constants/ConstantIntegerParser'
import { ConstantInterfaceMethodRefParser } from './constants/ConstantInterfaceMethodRefParser'
import { ConstantInvokeDynamicParser } from './constants/ConstantInvokeDynamicParser'
import { ConstantLongParser } from './constants/ConstantLongParser'
import { ConstantMethodHandleParser } from './constants/ConstantMethodHandleParser'
import { ConstantMethodRefParser } from './constants/ConstantMethodRefParser'
import { ConstantMethodTypeParser } from './constants/ConstantMethodTypeParser'
import { ConstantModuleParser } from './constants/ConstantModuleParser'
import { ConstantNameAndTypeParser } from './constants/ConstantNameAndTypeParser'
import { ConstantPackageParser } from './constants/ConstantPackageParser'
import { ConstantStringParser } from './constants/ConstantStringParser'
import { ConstantUtf8Parser } from './constants/ConstantUtf8Parser'
import { CPInfoTypes } from './CPInfoTypes'
import type { Lexer } from './Lexer'
import { ConstantDouble } from './types/constants/ConstantDouble'
import { ConstantLong } from './types/constants/ConstantLong'
import { EmptyBlock } from './types/constants/EmptyBlock'
import type { CPInfo } from './types/CPInfo'

export class CPInfoParser {
	public static parseMany(lexer: Lexer, count: number): CPInfo<any>[] {
		const result: CPInfo<any>[] = []
		for (let i = 0; i < count; i++) {
			const constant = CPInfoParser.parse(lexer)
			result.push(constant)
			if (constant instanceof ConstantLong || constant instanceof ConstantDouble) {
				result.push(new EmptyBlock({ tag: -1 }))
				i++
			}
		}
		return result
	}

	public static parse(lexer: Lexer): CPInfo<any> {
		const tag = lexer.read(1).toNumber()
		switch (tag) {
			case CPInfoTypes.CONSTANT_Class: return ConstantClassParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Fieldref: return ConstantFieldRefParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Methodref: return ConstantMethodRefParser.parse(lexer)
			case CPInfoTypes.CONSTANT_InterfaceMethodref: return ConstantInterfaceMethodRefParser.parse(lexer)
			case CPInfoTypes.CONSTANT_String: return ConstantStringParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Integer: return ConstantIntegerParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Float: return ConstantFloatParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Long: return ConstantLongParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Double: return ConstantDoubleParser.parse(lexer)
			case CPInfoTypes.CONSTANT_NameAndType: return ConstantNameAndTypeParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Utf8: return ConstantUtf8Parser.parse(lexer)
			case CPInfoTypes.CONSTANT_MethodHandle: return ConstantMethodHandleParser.parse(lexer)
			case CPInfoTypes.CONSTANT_MethodType: return ConstantMethodTypeParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Dynamic: return ConstantDynamicParser.parse(lexer)
			case CPInfoTypes.CONSTANT_InvokeDynamic: return ConstantInvokeDynamicParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Module: return ConstantModuleParser.parse(lexer)
			case CPInfoTypes.CONSTANT_Package: return ConstantPackageParser.parse(lexer)
			default:
				throw new Error(`Invalid CPInfoType: ${tag} -> ${lexer.read(4).toHexString()}`)
		}
	}
}
