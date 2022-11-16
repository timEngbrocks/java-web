import { DataType } from "../../data-types/data-type"
import { double } from "../../data-types/double"
import { float } from "../../data-types/float"
import { int } from "../../data-types/int"
import { long } from "../../data-types/long"
import { reference } from "../../data-types/references"
import { Instruction } from "../../Instruction"
import { HeapAddress } from "../../memory/heap"
import { LocalVariable } from "../../memory/local-variable"
import { Runtime } from "../../Runtime"

class xstore_n<T extends DataType<number | bigint | HeapAddress | null>> extends Instruction {
    length = 1
    private i: number
    constructor(i: number, private type: new () => T) {
        super()
        this.i = i
    }
    public override execute(): void {
        const value = Runtime.pop()
        if (!(value instanceof this.type)) throw 'Tried to store incompatible type using xstore_n'
        Runtime.setLocalVariable(new LocalVariable(value), this.i)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} : store_${this.i}`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const istore_0 = new xstore_n<int>(0, int)
export const istore_1 = new xstore_n<int>(1, int)
export const istore_2 = new xstore_n<int>(2, int)
export const istore_3 = new xstore_n<int>(3, int)

export const lstore_0 = new xstore_n<long>(0, long)
export const lstore_1 = new xstore_n<long>(1, long)
export const lstore_2 = new xstore_n<long>(2, long)
export const lstore_3 = new xstore_n<long>(3, long)

export const fstore_0 = new xstore_n<float>(0, float)
export const fstore_1 = new xstore_n<float>(1, float)
export const fstore_2 = new xstore_n<float>(2, float)
export const fstore_3 = new xstore_n<float>(3, float)

export const dstore_0 = new xstore_n<double>(0, double)
export const dstore_1 = new xstore_n<double>(1, double)
export const dstore_2 = new xstore_n<double>(2, double)
export const dstore_3 = new xstore_n<double>(3, double)

export const astore_0 = new xstore_n<reference>(0, reference)
export const astore_1 = new xstore_n<reference>(1, reference)
export const astore_2 = new xstore_n<reference>(2, reference)
export const astore_3 = new xstore_n<reference>(3, reference)