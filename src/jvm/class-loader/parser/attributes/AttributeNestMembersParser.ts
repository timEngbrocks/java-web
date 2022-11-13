import { Lexer } from "../../lexer";
import { AttributeNestMembers } from "../../types/attributes/AttributeNestMembers";
import { ConstantClassParser } from "../constants/ConstantClassParser";
import { AttributeInfoHeader } from "../AttributeInfoParser";

export class AttributeNestMembersParser {
    public parse(lexer: Lexer, header: AttributeInfoHeader): AttributeNestMembers {
        const numberOfClasses = lexer.read(2).toNumber()
        const classes = ConstantClassParser.parseMany(lexer, numberOfClasses)

        return new AttributeNestMembers({
            ...header,
            numberOfClasses,
            classes
        })
    }
}