import { ConstantClass } from "../../../class-loader/parser/types/constants/ConstantClass";
import { ConstantFieldRef } from "../../../class-loader/parser/types/constants/ConstantFieldRef";
import { ConstantNameAndType } from "../../../class-loader/parser/types/constants/ConstantNameAndType";
import { ConstantUtf8 } from "../../../class-loader/parser/types/constants/ConstantUtf8";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

export class getStatic extends Instruction {
    length = 3
    args = ""
    public override setArgs(args: string): void {
        this.args = args
    }
    public override execute(): void {
        const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
        const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
        const index = (indexbyte1 << 8) | indexbyte2
        const fieldRef = Runtime.getConstant(index)
        if (!(fieldRef instanceof ConstantFieldRef)) throw 'Tried getStatic without constant field ref'
        const clazz = Runtime.getConstant(fieldRef.data.classIndex) as ConstantClass
        const className = (Runtime.getConstant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString()

        const nameAndType = Runtime.getConstant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
        const fieldName = (Runtime.getConstant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString()
        
        const value = Runtime.getStaticField(className, fieldName)
        if (!value) throw `getstatic could not find field: ${className} -> ${fieldName}`
        Runtime.push(value)
    }
    public override toString(): string {
        const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
        const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
        const index = (indexbyte1 << 8) | indexbyte2
        return `getstatic @ ${index}`
    }
}