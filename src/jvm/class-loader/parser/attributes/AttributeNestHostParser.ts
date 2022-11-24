import { Lexer } from "../lexer"
import { AttributeInfoHeader } from "../types/AttributeInfo"
import { AttributeNestHost } from "../types/attributes/AttributeNestHost"

export class AttributeNestHostParser {
    public static parse(lexer: Lexer, header: AttributeInfoHeader): AttributeNestHost {
        const hostClassIndex = lexer.read(2).toNumber()

        return new AttributeNestHost({
            header,
            hostClassIndex
        })
    }
}