import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { ConstantValueData } from "./ConstantValueData";

export interface ConstantLongData extends ConstantValueData {
    tag: number
    value: bigint
}

export class ConstantLong extends CPInfo<ConstantLongData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
    }
}