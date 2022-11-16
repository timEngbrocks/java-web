import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantFloatData extends JTypeData {
    tag: number
    value: number
}

export class ConstantFloat extends CPInfo<ConstantFloatData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}