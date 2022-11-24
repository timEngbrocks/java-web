import { ConstantClass } from "../../../class-loader/parser/types/constants/ConstantClass";
import { ConstantInterfaceMethodRef } from "../../../class-loader/parser/types/constants/ConstantInterfaceMethodRef";
import { ConstantMethodRef } from "../../../class-loader/parser/types/constants/ConstantMethodRef";
import { ConstantNameAndType } from "../../../class-loader/parser/types/constants/ConstantNameAndType";
import { ConstantUtf8 } from "../../../class-loader/parser/types/constants/ConstantUtf8";
import { Instruction } from "../../Instruction";
import { LocalVariable } from "../../memory/local-variable";
import { Runtime } from "../../Runtime";
import { getTypesFromMethodDescriptor } from "../../util";

export class invokestatic extends Instruction {
    length = 3
    args = ""
    public override setArgs(args: string): void {
        this.args = args
    }
    // FIXME: synchronized
    // FIXME: native methods
    public override execute(): void {
        const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
        const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
        const index = (indexbyte1 << 8) | indexbyte2
        const methodRef = Runtime.getConstant(index)
        if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw 'Tried invokestatic without constant method ref'
        const clazz = Runtime.getConstant(methodRef.data.classIndex) as ConstantClass
        const className = (Runtime.getConstant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
        const nameAndType = Runtime.getConstant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
        const methodName = (Runtime.getConstant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
        const descriptor = (Runtime.getConstant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
        const types = getTypesFromMethodDescriptor(descriptor)

        const classObject = Runtime.classes.find(clazz => clazz.name == className)
        if (!classObject) throw `invokestatic: could not find class: ${className}`
        for (let i = 0; i < types.parameters.length; i++) classObject.setLocalVariable(new LocalVariable(Runtime.pop()), i + 1)

        Runtime.callFunction(className, methodName)
    }
    public override toString(): string {
        const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
        const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
        const index = (indexbyte1 << 8) | indexbyte2
        return `invokestatic @ ${index}`
    }
}