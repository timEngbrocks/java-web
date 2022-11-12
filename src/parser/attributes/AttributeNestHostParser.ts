import { Lexer } from "../../lexer";
import { AttributeNestHost } from "../../types/attributes/AttributeNestHost";
import { AttributeInfoHeader } from "../AttributeInfoParser";

export class AttributeNestHostParser {
    public parse(lexer: Lexer, header: AttributeInfoHeader): AttributeNestHost {
        const hostClassIndex = lexer.read(2).toNumber()

        return new AttributeNestHost({
            ...header,
            hostClassIndex
        })
    }
}