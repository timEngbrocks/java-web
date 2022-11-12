import { ByteStream } from "../byte-stream";
import { Lexer } from "../lexer";
import { CPInfo } from "../types/CPInfo";
import { JTypeData } from "../types/JType";
import { ConstantClassParser } from "./constants/ConstantClassParser";
import { ConstantFieldRefParser } from "./constants/ConstantFieldRefParser";
import { ConstantMethodRefParser } from "./constants/ConstantMethodRefParser";
import { ConstantNameAndTypeParser } from "./constants/ConstantNameAndTypeParser";
import { ConstantStringParser } from "./constants/ConstantStringParser";
import { ConstantUtf8Parser } from "./constants/ConstantUtf8Parser";

export enum CPInfoTypes {
    CONSTANT_Class = 7,
    CONSTANT_Fieldref = 9,
    CONSTANT_Methodref = 10,
    CONSTANT_InterfaceMethodref = 11,
    CONSTANT_String = 8,
    CONSTANT_Integer = 3,
    CONSTANT_Float = 4,
    CONSTANT_Long = 5,
    CONSTANT_Double = 6,
    CONSTANT_NameAndType = 12,
    CONSTANT_Utf8 = 1,
    CONSTANT_MethodHandle = 15,
    CONSTANT_MethodType = 16,
    CONSTANT_InvokeDynamic = 18,
}

export class CPInfoParser {
    public static parseMany(lexer: Lexer, count: number): CPInfo<any>[] {
        const result: CPInfo<any>[] = []
        for (let i = 0; i < count; i++) {
            result.push(CPInfoParser.parse(lexer))
        }
        return result
    }
    
    public static parse(lexer: Lexer): CPInfo<any> {
        const tag = lexer.read(1).toNumber()
        switch (tag) {
            case CPInfoTypes.CONSTANT_Class: return ConstantClassParser.parse(lexer)
            case CPInfoTypes.CONSTANT_Methodref: return ConstantMethodRefParser.parse(lexer)
            case CPInfoTypes.CONSTANT_NameAndType: return ConstantNameAndTypeParser.parse(lexer)
            case CPInfoTypes.CONSTANT_Utf8: return ConstantUtf8Parser.parse(lexer)
            case CPInfoTypes.CONSTANT_Fieldref: return ConstantFieldRefParser.parse(lexer)
            case CPInfoTypes.CONSTANT_String: return ConstantStringParser.parse(lexer)
            default:
                console.debug(`Unimplemented CPInfoType: ${tag}`)
                console.debug(lexer.read(4).toString())
        }
        return new CPInfo({})
    }
}