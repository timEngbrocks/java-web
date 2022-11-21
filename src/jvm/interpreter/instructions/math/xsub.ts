import { DataType } from "../../data-types/data-type";
import { double } from "../../data-types/double";
import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

class xsub<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private type: new () => T) {
        super()
    }
    public override execute(): void {
        const value1 = Runtime.pop()
        const value2 = Runtime.pop()
        if (!(value1 instanceof this.type && value2 instanceof this.type)) throw `Tried using xsub with wrong types`
        const result = this.newConstant()
        result.set(value1.get() - value2.get())
        Runtime.push(result)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} : sub`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const isub = new xsub<int>(int)
export const lsub = new xsub<long>(long)
export const fsub = new xsub<float>(float)
export const dsub = new xsub<double>(double)