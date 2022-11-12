import { ByteStream } from "../byte-stream";
import { Lexer } from "../lexer";
import { MethodInfo } from "../types/MethodInfo";
import { AttributeInfoParser } from "./AttributeInfoParser";
import { ConstantResolver } from "./parser";

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
        const accessFlags = MethodInfoParser.parseMethodAccessFlags(lexer.read(2))
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

    public static parseMethodAccessFlags(bytes: ByteStream): MethodAccessFlags[] {
        const mask = bytes.toNumber()
        const flags = []
        if (mask & MethodAccessFlags.ACC_PUBLIC) flags.push(MethodAccessFlags.ACC_PUBLIC)
        if (mask & MethodAccessFlags.ACC_PRIVATE) flags.push(MethodAccessFlags.ACC_PRIVATE)
        if (mask & MethodAccessFlags.ACC_PROTECTED) flags.push(MethodAccessFlags.ACC_PROTECTED)
        if (mask & MethodAccessFlags.ACC_STATIC) flags.push(MethodAccessFlags.ACC_STATIC)
        if (mask & MethodAccessFlags.ACC_FINAL) flags.push(MethodAccessFlags.ACC_FINAL)
        if (mask & MethodAccessFlags.ACC_SYNCHRONIZED) flags.push(MethodAccessFlags.ACC_SYNCHRONIZED)
        if (mask & MethodAccessFlags.ACC_BRIDGE) flags.push(MethodAccessFlags.ACC_BRIDGE)
        if (mask & MethodAccessFlags.ACC_VARARGS) flags.push(MethodAccessFlags.ACC_VARARGS)
        if (mask & MethodAccessFlags.ACC_NATIVE) flags.push(MethodAccessFlags.ACC_NATIVE)
        if (mask & MethodAccessFlags.ACC_ABSTRACT) flags.push(MethodAccessFlags.ACC_ABSTRACT)
        if (mask & MethodAccessFlags.ACC_STRICT) flags.push(MethodAccessFlags.ACC_STRICT)
        if (mask & MethodAccessFlags.ACC_SYNTHETIC) flags.push(MethodAccessFlags.ACC_SYNTHETIC)
        return flags
    }
}