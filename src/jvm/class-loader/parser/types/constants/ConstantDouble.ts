import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { ConstantValueData } from "./ConstantValueData";

export interface ConstantDoubleData extends ConstantValueData {
    tag: number
    value: number
}

export class ConstantDouble extends CPInfo<ConstantDoubleData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}