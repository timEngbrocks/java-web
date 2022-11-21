import { DataType } from "../../data-types/data-type";
import { double } from "../../data-types/double";
import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

enum XCmpOps {
    none = <any>'',
    l = <any>'l',
    g = <any>'g'
}

class xcmp<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private op: XCmpOps, private type: new () => T) {
        super()
    }
    public override execute(): void {
        const value2 = Runtime.pop()
        const value1 = Runtime.pop()
        const result = new int()

        if (this.op === XCmpOps.l && (value1.get() == Number.NaN || value2.get() == Number.NaN)) result.set(-1)
        else if (this.op === XCmpOps.g && (value1.get() == Number.NaN || value2.get() == Number.NaN)) result.set(1)
        else if (value1.get() > value2.get()) result.set(1)
        else if (value1.get() == value2.get()) result.set(0)
        else if (value1.get() < value2.get()) result.set(-1)
        Runtime.push(result)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} cmp ${XCmpOps[this.op]}`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const lcmp = new xcmp<long>(XCmpOps.none, long)
export const fcmpl = new xcmp<float>(XCmpOps.l, float)
export const fcmpg = new xcmp<float>(XCmpOps.g, float)
export const dcmpl = new xcmp<double>(XCmpOps.l, double)
export const dcmpg = new xcmp<double>(XCmpOps.g, double)