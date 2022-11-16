import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantMethodHandleData extends JTypeData {
    tag: number
    referenceKind: number
    referenceIndex: number
}

export class ConstantMethodHandle extends CPInfo<ConstantMethodHandleData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        referenceKind: ${this.data.referenceKind}
        referenceIndex: ${this.data.referenceIndex}`
    }
}