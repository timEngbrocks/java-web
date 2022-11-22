import { DataType } from "../../data-types/data-type";
import { double } from "../../data-types/double";
import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

class xrem<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private type: new () => T) {
        super()
    }
    public override execute(): void {
        const value2 = Runtime.pop().get()
        if (value2 == 0) throw 'Division by zero'
        const value1 = Runtime.pop().get()
        const result = this.newConstant()
        result.set(value1 - (value1 / value2) * value2)
        Runtime.push(result)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} rem`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const irem = new xrem<int>(int)
export const lrem = new xrem<long>(long)
export const frem = new xrem<float>(float)
export const drem = new xrem<double>(double)