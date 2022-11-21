import { array } from "../../data-types/array"
import { byte } from "../../data-types/byte"
import { char } from "../../data-types/char"
import { DataType } from "../../data-types/data-type"
import { double } from "../../data-types/double"
import { float } from "../../data-types/float"
import { int } from "../../data-types/int"
import { long } from "../../data-types/long"
import { reference } from "../../data-types/references"
import { short } from "../../data-types/short"
import { Instruction } from "../../Instruction"
import { HEAP_TYPES } from "../../memory/heap"
import { Runtime } from "../../Runtime"

class xastore<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private type: new () => T) {
        super()
    }
    public override execute(): void {
        const value = Runtime.pop()
        const index = Runtime.pop()
        const arrayRef = Runtime.pop()
        if (!(value instanceof this.type)) throw 'Tried to store incompatible type into array'
        if (!(arrayRef instanceof reference && index instanceof int)) throw 'Did not find correct operand types on stack for xastore'
        const ref = arrayRef.get()
        if (!(ref !== null && ref.getType() === HEAP_TYPES.ARRAY)) throw 'Tried storing to array without a non-null array reference'
        const heapObject = Runtime.load(ref)
        if (!(heapObject instanceof array<T>)) throw 'Tried to store into array of incompatible type'
        heapObject.setAt(value, index.get())
        Runtime.push(value)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} : astore`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const iastore = new xastore<int>(int)
export const lastore = new xastore<long>(long)
export const fastore = new xastore<float>(float)
export const dastore = new xastore<double>(double)
export const aastore = new xastore<reference>(reference)
export const bastore = new xastore<byte>(byte)
export const castore = new xastore<char>(char)
export const sastore = new xastore<short>(short)