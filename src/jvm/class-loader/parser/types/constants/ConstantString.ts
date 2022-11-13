import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantStringData extends JTypeData {
    tag: number
    stringIndex: number
}

export class ConstantString extends CPInfo<ConstantStringData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        stringIndex: ${this.data.stringIndex}`
    }
}