import { ConstantClassParser } from "./constants/ConstantClassParser";
import { ConstantDoubleParser } from "./constants/ConstantDoubleParser";
import { ConstantFieldRefParser } from "./constants/ConstantFieldRefParser";
import { ConstantFloatParser } from "./constants/ConstantFloatParser";
import { ConstantIntegerParser } from "./constants/ConstantIntegerParser";
import { ConstantInterfaceMethodRefParser } from "./constants/ConstantInterfaceMethodRefParser";
import { ConstantLongParser } from "./constants/ConstantLongParser";
import { ConstantMethodHandleParser } from "./constants/ConstantMethodHandleParser";
import { ConstantMethodRefParser } from "./constants/ConstantMethodRefParser";
import { ConstantMethodTypeParser } from "./constants/ConstantMethodTypeParser";
import { ConstantNameAndTypeParser } from "./constants/ConstantNameAndTypeParser";
import { ConstantStringParser } from "./constants/ConstantStringParser";
import { ConstantUtf8Parser } from "./constants/ConstantUtf8Parser";
import { Lexer } from "./lexer";
import { CPInfo } from "./types/CPInfo";

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
            case CPInfoTypes.CONSTANT_Double: return ConstantDoubleParser.parse(lexer)
            case CPInfoTypes.CONSTANT_Long: return ConstantLongParser.parse(lexer)
            case CPInfoTypes.CONSTANT_Integer: return ConstantIntegerParser.parse(lexer)
            case CPInfoTypes.CONSTANT_Float: return ConstantFloatParser.parse(lexer)
            case CPInfoTypes.CONSTANT_MethodType: return ConstantMethodTypeParser.parse(lexer)
            case CPInfoTypes.CONSTANT_MethodHandle: return ConstantMethodHandleParser.parse(lexer)
            case CPInfoTypes.CONSTANT_InterfaceMethodref: return ConstantInterfaceMethodRefParser.parse(lexer)
            default:
                console.debug(`Unimplemented CPInfoType: ${tag}`)
                console.debug(lexer.read(4).toString())
        }
        return new CPInfo({})
    }
}