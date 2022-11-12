import dedent from "dedent";
import { map } from "lodash";
import { ByteStream } from "../byte-stream";
import { FieldAccessFlags } from "../parser/FieldInfoParser";
import { AttributeInfo } from "./AttributeInfo";
import { JType, JTypeData } from "./JType";

export interface FieldInfoData extends JTypeData {
    accessFlags: FieldAccessFlags[],
    nameIndex: number,
    descriptorIndex: number,
    attributesCount: number,
    attributes: AttributeInfo<any>[]
}

export class FieldInfo extends JType<FieldInfoData> {
    public override toString(): string {
        return dedent`access flags: ${map(this.data.accessFlags, flag => FieldAccessFlags[flag]).join(', ')}
        nameIndex: ${this.data.nameIndex}
        descriptorIndex: ${this.data.descriptorIndex}
        #attributes: ${this.data.attributesCount}`
    }
}