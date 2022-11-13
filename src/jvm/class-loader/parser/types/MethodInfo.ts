import dedent from "dedent";
import { map } from "lodash";
import { MethodAccessFlags } from "../MethodInfoParser";
import { AttributeInfo } from "./AttributeInfo";
import { JType, JTypeData } from "./JType";

export interface MethodInfoData extends JTypeData {
    accessFlags: MethodAccessFlags[]
    nameIndex: number
    descriptorIndex: number
    attributesCount: number
    attributes: AttributeInfo<any>[]
}

export class MethodInfo extends JType<MethodInfoData> {
    public override toString(): string {
        return dedent`access flags: ${map(this.data.accessFlags, flag => MethodAccessFlags[flag]).join(', ')}
        nameIndex: ${this.data.nameIndex}
        descriptorIndex: ${this.data.descriptorIndex}
        #attributes: ${this.data.attributesCount}`
    }
}