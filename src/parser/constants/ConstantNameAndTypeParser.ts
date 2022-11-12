import { Lexer } from "../../lexer"
import { ConstantNameAndType } from "../../types/constants/ConstantNameAndType"
import { CPInfoTypes } from "../CPInfo.parser"

export class ConstantNameAndTypeParser {
    public static parse(lexer: Lexer): ConstantNameAndType {
        const nameIndex = lexer.read(2).toNumber()
        const descriptorIndex = lexer.read(2).toNumber()

        return new ConstantNameAndType({
            tag: CPInfoTypes.CONSTANT_NameAndType,
            nameIndex,
            descriptorIndex
        })
    }
}