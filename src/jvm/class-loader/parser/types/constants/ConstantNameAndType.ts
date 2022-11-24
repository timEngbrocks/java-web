import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { ConstantData } from "./ConstantData";

export interface ConstantNameAndTypeData extends ConstantData {
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