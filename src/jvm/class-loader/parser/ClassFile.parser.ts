import { AttributeInfoParser } from './AttributeInfoParser'
import { ByteStream } from './byte-stream'
import { CPInfoParser } from './CPInfo.parser'
import { FieldInfoParser } from './FieldInfoParser'
import { Lexer } from './lexer'
import { MethodInfoParser } from './MethodInfoParser'
import { ClassFileHeaderData, ClassFile, ClassAccessFlag } from './types/ClassFile'
import { CPInfo } from './types/CPInfo'

export class ClassFileParser {
	public static preParse(lexer: Lexer): ClassFileHeaderData {
		const magic = lexer.read(4).toHexString()
		const minorVersion = lexer.read(2).toNumber()
		const majorVersion = lexer.read(2).toNumber()
		const constantPoolCount = lexer.read(2).toNumber()
		const constantPool = CPInfoParser.parseMany(lexer, constantPoolCount - 1)
		const accessFlags = ClassFileParser.parseClassAccessFlags(lexer.read(2))

		return {
			magic,
			minorVersion,
			majorVersion,
			constantPoolCount,
			constantPool,
			accessFlags
		}
	}

	public static parseMany(lexer: Lexer, count: number): ClassFile[] {
		const result: ClassFile[] = []
		for (let i = 0; i < count; i++) {
			result.push(ClassFileParser.parse(lexer, ClassFileParser.preParse(lexer)))
		}
		return result
	}

	public static parse(lexer: Lexer, header: ClassFileHeaderData): ClassFile {
		const constantResolver = (index: number): CPInfo<any> => header.constantPool[index - 1]

		const thisClass = lexer.read(2).toNumber()
		const superClass = lexer.read(2).toNumber()
		const interfacesCount = lexer.read(2).toNumber()
		const interfaces = []
		for (let i = 0; i < interfacesCount; i++) {
			interfaces.push(lexer.read(2).toNumber())
		}
		const fieldsCount = lexer.read(2).toNumber()
		const fields = FieldInfoParser.parseMany(lexer, constantResolver, fieldsCount)
		const methodsCount = lexer.read(2).toNumber()
		const methods = MethodInfoParser.parseMany(lexer, constantResolver, methodsCount)
		const attributesCount = lexer.read(2).toNumber()
		const attributes = AttributeInfoParser.parseMany(lexer, constantResolver, attributesCount)

		return new ClassFile({
			header,
			thisClass,
			superClass,
			interfacesCount,
			interfaces,
			fieldsCount,
			fields,
			methodsCount,
			methods,
			attributesCount,
			attributes
		})
	}

	public static parseClassAccessFlags(bytes: ByteStream): ClassAccessFlag[] {
		const mask = bytes.toNumber()
		const flags = []
		if (mask & ClassAccessFlag.ACC_PUBLIC) flags.push(ClassAccessFlag.ACC_PUBLIC)
		if (mask & ClassAccessFlag.ACC_FINAL) flags.push(ClassAccessFlag.ACC_FINAL)
		if (mask & ClassAccessFlag.ACC_SUPER) flags.push(ClassAccessFlag.ACC_SUPER)
		if (mask & ClassAccessFlag.ACC_INTERFACE) flags.push(ClassAccessFlag.ACC_INTERFACE)
		if (mask & ClassAccessFlag.ACC_ABSTRACT) flags.push(ClassAccessFlag.ACC_ABSTRACT)
		if (mask & ClassAccessFlag.ACC_SYNTHETIC) flags.push(ClassAccessFlag.ACC_SYNTHETIC)
		if (mask & ClassAccessFlag.ACC_ANNOTATION) flags.push(ClassAccessFlag.ACC_ANNOTATION)
		if (mask & ClassAccessFlag.ACC_ENUM) flags.push(ClassAccessFlag.ACC_ENUM)
		return flags
	}
}
