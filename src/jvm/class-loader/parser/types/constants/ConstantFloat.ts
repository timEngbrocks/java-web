import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { ConstantValueData } from "./ConstantValueData";

export interface ConstantFloatData extends ConstantValueData {
    tag: number
    value: number
}

export class ConstantFloat extends CPInfo<ConstantFloatData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}