import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantNameAndTypeData extends JTypeData {
    tag: number
    nameIndex: number
    descriptorIndex: number
}

export class ConstantNameAndType extends CPInfo<ConstantNameAndTypeData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        nameIndex: ${this.data.nameIndex}
        descriptorIndex: ${this.data.descriptorIndex}`
    }
}