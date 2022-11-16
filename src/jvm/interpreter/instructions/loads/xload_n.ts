import { DataType } from "../../data-types/data-type";
import { double } from "../../data-types/double";
import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { reference } from "../../data-types/references";
import { Instruction } from "../../Instruction";
import { HeapAddress } from "../../memory/heap";
import { Runtime } from "../../Runtime";

class xload_n<T extends DataType<number | bigint | HeapAddress | null>> extends Instruction {
    length = 1
    private i: number
    constructor(i: number, private type: new () => T) {
        super()
        this.i = i
    }
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(this.i)
        const value = localVariable.get()
        Runtime.push(value)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} : load_${this.i}`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const iload_0 = new xload_n<int>(0, int)
export const iload_1 = new xload_n<int>(1, int)
export const iload_2 = new xload_n<int>(2, int)
export const iload_3 = new xload_n<int>(3, int)

export const lload_0 = new xload_n<long>(0, long)
export const lload_1 = new xload_n<long>(1, long)
export const lload_2 = new xload_n<long>(2, long)
export const lload_3 = new xload_n<long>(3, long)

export const fload_0 = new xload_n<float>(0, float)
export const fload_1 = new xload_n<float>(1, float)
export const fload_2 = new xload_n<float>(2, float)
export const fload_3 = new xload_n<float>(3, float)

export const dload_0 = new xload_n<double>(0, double)
export const dload_1 = new xload_n<double>(1, double)
export const dload_2 = new xload_n<double>(2, double)
export const dload_3 = new xload_n<double>(3, double)

export const aload_0 = new xload_n<reference>(0, reference)
export const aload_1 = new xload_n<reference>(1, reference)
export const aload_2 = new xload_n<reference>(2, reference)
export const aload_3 = new xload_n<reference>(3, reference)