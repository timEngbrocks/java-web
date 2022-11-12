import dedent from "dedent";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantClassData extends JTypeData {
    tag: number
    nameIndex: number
}

export class ConstantClass extends CPInfo<ConstantClassData> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        nameIndex: ${this.data.nameIndex}`
    }
}