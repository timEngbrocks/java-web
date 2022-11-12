import { Lexer } from "../../lexer";
import { AttributeConstantValue } from "../../types/attributes/AttributeConstantValue";
import { AttributeInfoHeader } from "../AttributeInfoParser";

export class AttributeConstantValueParser {
    public parse(lexer: Lexer, header: AttributeInfoHeader): AttributeConstantValue {
        const constantValueIndex = lexer.read(2).toNumber()

        return new AttributeConstantValue({
            ...header,
            constantValueIndex
        })
    }
}