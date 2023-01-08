import { AttributeInfoParser } from './AttributeInfoParser'
import type { ConstantResolver } from './ConstantResolver'
import type { Lexer } from './Lexer'
import { MethodInfo } from './types/MethodInfo'

export enum MethodAccessFlags {
	ACC_PUBLIC = 0x0001,
	ACC_PRIVATE = 0x0002,
	ACC_PROTECTED = 0x0004,
	ACC_STATIC = 0x0008,
	ACC_FINAL = 0x0010,
	ACC_SYNCHRONIZED = 0x0020,
	ACC_BRIDGE = 0x0040,
	ACC_VARARGS = 0x0080,
	ACC_NATIVE = 0x0100,
	ACC_ABSTRACT = 0x0400,
	ACC_STRICT = 0x0800,
	ACC_SYNTHETIC = 0x1000
}

export class MethodInfoParser {
	public static parseMany(lexer: Lexer, constantResolver: ConstantResolver, count: number): MethodInfo[] {
		const result: MethodInfo[] = []
		for (let i = 0; i < count; i++) {
			result.push(MethodInfoParser.parse(lexer, constantResolver))
		}
		return result
	}

	public static parse(lexer: Lexer, constantResolver: ConstantResolver): MethodInfo {
		const accessFlags = lexer.read(2).toNumber()
		const nameIndex = lexer.read(2).toNumber()
		const descriptorIndex = lexer.read(2).toNumber()
		const attributesCount = lexer.read(2).toNumber()
		const attributes = AttributeInfoParser.parseMany(lexer, constantResolver, attributesCount)

		return new MethodInfo({
			accessFlags,
			nameIndex,
			descriptorIndex,
			attributesCount,
			attributes
		})
	}
}
