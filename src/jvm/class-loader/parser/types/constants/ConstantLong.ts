import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantLongData extends JTypeData {
    tag: number
    value: bigint
}

export class ConstantLong extends CPInfo<ConstantLongData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}