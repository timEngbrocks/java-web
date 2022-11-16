import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantIntegerData extends JTypeData {
    tag: number
    value: number
}

export class ConstantInteger extends CPInfo<ConstantIntegerData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}