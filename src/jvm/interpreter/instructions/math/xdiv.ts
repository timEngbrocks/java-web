import { DataType } from "../../data-types/data-type";
import { double } from "../../data-types/double";
import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

class xdiv<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private type: new () => T) {
        super()
    }
    public override execute(): void {
        const value2 = Runtime.pop()
        const value1 = Runtime.pop()
        if (!(value1 instanceof this.type && value2 instanceof this.type)) throw `Tried using xdiv with wrong types`
        if (value2.get() == 0) throw 'Division by zero'
        if (value1 instanceof int && value2 instanceof int) {
            const result = this.newConstant()
            result.set(Math.floor(value1.get() / value2.get()))
            Runtime.push(result)
        } else {
            const result = this.newConstant()
            result.set(value1.get() / value2.get())
            Runtime.push(result)
        }
    }
    public override toString(): string {
        return `${this.newConstant().toString()} : div`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const idiv = new xdiv<int>(int)
export const ldiv = new xdiv<long>(long)
export const fdiv = new xdiv<float>(float)
export const ddiv = new xdiv<double>(double)