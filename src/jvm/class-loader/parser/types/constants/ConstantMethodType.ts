import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantMethodTypeData extends JTypeData {
    tag: number
    descriptorIndex: number
}

export class ConstantMethodType extends CPInfo<ConstantMethodTypeData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        descriptorIndex: ${this.data.descriptorIndex}`
    }
}