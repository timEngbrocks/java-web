import { DataType } from "../../data-types/data-type";
import { int } from "../../data-types/int";
import { long } from "../../data-types/long";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";

class xxor<T extends DataType<any>> extends Instruction {
    length = 1
    constructor(private type: new () => T) {
        super()
    }
    public override execute(): void {
        const value2 = Runtime.pop().get()
        const value1 = Runtime.pop().get()
        const result = this.newConstant()
        result.set(value1 ^ value2)
        Runtime.push(result)
    }
    public override toString(): string {
        return `${this.newConstant().toString()} xor`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const ixor = new xxor<int>(int)
export const lxor = new xxor<long>(long)