import dedent from "dedent";
import { ByteStream } from "../../byte-stream";
import { CPInfo } from "../CPInfo";
import { JTypeData } from "../JType";

export interface ConstantUtf8Data extends JTypeData {
    tag: number
    length: number
    bytes: ByteStream
}

export class ConstantUtf8 extends CPInfo<ConstantUtf8Data> {
    public override toString(): string {
        return dedent`tag: ${this.data.tag}
        length: ${this.data.length}
        bytes: ${this.data.bytes.toString()}`
    }
}