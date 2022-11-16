import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantDoubleData extends JTypeData {
    tag: number
    value: number
}

export class ConstantDouble extends CPInfo<ConstantDoubleData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}