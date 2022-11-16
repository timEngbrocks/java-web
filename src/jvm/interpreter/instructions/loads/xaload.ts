import { array } from "../../data-types/array";
import { byte } from "../../data-types/byte";
import { char } from "../../data-types/char";
import { DataType } from "../../data-types/data-type";
import { double } from "../../data-types/double";
import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { reference } from "../../data-types/references";
import { short } from "../../data-types/short";
import { Instruction } from "../../Instruction";
import { HEAP_TYPES } from "../../memory/heap";
import { Runtime } from "../../Runtime";

class xaload<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private type: new () => T) {
        super()
    }
    public override execute(): void {
        const arrayRef = Runtime.pop()
        const index = Runtime.pop()
        if (!(arrayRef instanceof reference && index instanceof int)) throw 'Did not find correct operand types on stack for xaload'
        const ref = arrayRef.get()
        if (!(ref !== null && ref.getType() === HEAP_TYPES.ARRAY)) throw 'Tried loading from array without a non-null array reference'
        const heapObject = Runtime.load(ref)
        if (!(heapObject instanceof array<T>)) throw 'Tried to load array of incompatible type'
        const value = heapObject.getAt(index.get()) as T
        Runtime.push(value)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} : aload`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const iaload = new xaload<int>(int)
export const laload = new xaload<long>(long)
export const faload = new xaload<float>(float)
export const daload = new xaload<double>(double)
export const aaload = new xaload<reference>(reference)
export const baload = new xaload<byte>(byte)
export const caload = new xaload<char>(char)
export const saload = new xaload<short>(short)