import { AttributeInfoParser } from "./AttributeInfoParser";
import { ByteStream } from "./byte-stream";
import { Lexer } from "./lexer";
import { ConstantResolver } from "./Parser";
import { FieldInfo } from "./types/FieldInfo";

export enum FieldAccessFlags {
    ACC_PUBLIC = 0x0001,
    ACC_PRIVATE = 0x0002,
    ACC_PROTECTED = 0x0004,
    ACC_STATIC = 0x0008,
    ACC_FINAL = 0x0010,
    ACC_VOLATILE = 0x0040,
    ACC_TRANSIENT = 0x0080,
    ACC_SYNTHETIC = 0x1000,
    ACC_ENUM = 0x4000,
}

export class FieldInfoParser {
    public static parseMany(lexer: Lexer, constantResolver: ConstantResolver, count: number): FieldInfo[] {
        const result: FieldInfo[] = []
        for (let i = 0; i < count; i++) {
            result.push(FieldInfoParser.parse(lexer, constantResolver))
        }
        return result
    }

    public static parse(lexer: Lexer, constantResolver: ConstantResolver): FieldInfo {
        const accessFlags = FieldInfoParser.parseFieldAccessFlags(lexer.read(2))
        const nameIndex = lexer.read(2).toNumber()
        const descriptorIndex = lexer.read(2).toNumber()
        const attributesCount = lexer.read(2).toNumber()
        const attributes = AttributeInfoParser.parseMany(lexer, constantResolver, attributesCount)

        return new FieldInfo({
            accessFlags,
            nameIndex,
            descriptorIndex,
            attributesCount,
            attributes
        })
    }

    public static parseFieldAccessFlags(bytes: ByteStream): FieldAccessFlags[] {
        const mask = bytes.toNumber()
        const flags = []
        if (mask & FieldAccessFlags.ACC_PUBLIC) flags.push(FieldAccessFlags.ACC_PUBLIC)
        if (mask & FieldAccessFlags.ACC_PRIVATE) flags.push(FieldAccessFlags.ACC_PRIVATE)
        if (mask & FieldAccessFlags.ACC_PROTECTED) flags.push(FieldAccessFlags.ACC_PROTECTED)
        if (mask & FieldAccessFlags.ACC_STATIC) flags.push(FieldAccessFlags.ACC_STATIC)
        if (mask & FieldAccessFlags.ACC_FINAL) flags.push(FieldAccessFlags.ACC_FINAL)
        if (mask & FieldAccessFlags.ACC_VOLATILE) flags.push(FieldAccessFlags.ACC_VOLATILE)
        if (mask & FieldAccessFlags.ACC_TRANSIENT) flags.push(FieldAccessFlags.ACC_TRANSIENT)
        if (mask & FieldAccessFlags.ACC_SYNTHETIC) flags.push(FieldAccessFlags.ACC_SYNTHETIC)
        if (mask & FieldAccessFlags.ACC_ENUM) flags.push(FieldAccessFlags.ACC_ENUM)
        return flags
    }
}