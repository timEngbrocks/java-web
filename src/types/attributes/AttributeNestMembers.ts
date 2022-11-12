import dedent from "dedent"
import { AttributeInfoHeader } from "../AttributeInfo"
import { ConstantClass } from "../constants/ConstantClass"
import { JType, JTypeData } from "../JType"

export interface AttributeNestMembersData extends JTypeData {
    header: AttributeInfoHeader
    numberOfClasses: number
    classes: ConstantClass[]
}

export class AttributeNestMembers extends JType<AttributeNestMembersData> {
    public override toString(): string {
        return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}
        numberOfClasses: ${this.data.numberOfClasses}`
    }
}