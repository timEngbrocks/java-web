import { Lexer } from "../../lexer";
import { AttributePermittedSubclasses } from "../../types/attributes/AttributePermittedSubclasses";
import { ConstantClassParser } from "../constants/ConstantClassParser";
import { AttributeInfoHeader } from "../AttributeInfoParser";

export class AttributePermittedSubclassesParser {
    public parse(lexer: Lexer, header: AttributeInfoHeader): AttributePermittedSubclasses {
        const numberOfClasses = lexer.read(2).toNumber()
        const classes = ConstantClassParser.parseMany(lexer, numberOfClasses)

        return new AttributePermittedSubclasses({
            ...header,
            numberOfClasses,
            classes
        })
    }
}