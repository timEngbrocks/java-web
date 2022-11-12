import { Lexer } from "../../lexer"
import { ConstantFieldRef } from "../../types/constants/ConstantFieldRef"
import { CPInfoTypes } from "../CPInfo.parser"

export class ConstantFieldRefParser {
    public static parse(lexer: Lexer): ConstantFieldRef {
        const classIndex = lexer.read(2).toNumber()
        const nameAndTypeIndex = lexer.read(2).toNumber()
        
        return new ConstantFieldRef({
            tag: CPInfoTypes.CONSTANT_Fieldref,
            classIndex,
            nameAndTypeIndex
        })
    }
}