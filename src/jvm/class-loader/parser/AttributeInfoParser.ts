import { AttributeCodeParser } from "./attributes/AttributeCodeParser";
import { Lexer } from "./lexer";
import { ConstantResolver } from "./Parser";
import { AttributeInfo } from "./types/AttributeInfo";
import { ConstantUtf8 } from "./types/constants/ConstantUtf8";

export class AttributeInfoParser {
    public static parseMany(lexer: Lexer, constantResolver: ConstantResolver, count: number): AttributeInfo<any>[] {
        const result: AttributeInfo<any>[] = []
        for (let i = 0; i < count; i++) {
            result.push(AttributeInfoParser.parse(lexer, constantResolver))
        }
        return result
    }

    public static parse(lexer: Lexer, constantResolver: ConstantResolver): AttributeInfo<any> {
        const attributeNameIndex = lexer.read(2).toNumber()
        const attributeLength = lexer.read(4).toNumber()
        const header = { attributeNameIndex, attributeLength }

        const attributeName = (constantResolver(attributeNameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
        switch (attributeName) {
            case 'Code': return AttributeCodeParser.parse(lexer, constantResolver, header)
            default: {
                console.debug(`Unimplemented attribute: ${attributeName} with length: ${attributeLength}`)
                lexer.read(attributeLength)
            }
        }

        return new AttributeInfo({
            header
        })
    }
}