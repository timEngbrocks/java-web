import { DataType } from "../../data-types/data-type"
import { double } from "../../data-types/double"
import { float } from "../../data-types/float"
import { int } from "../../data-types/int"
import { long } from "../../data-types/long"
import { reference } from "../../data-types/references"
import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"

class xload<T extends DataType<any>> extends Instruction {
    length = 2
    args: string = ""
    constructor(private type: new () => T) {
        super()
    }
    public override setArgs(args: string): void {
        this.args = args
    }
    public override execute(): void {
        const index = Number.parseInt(this.args.substring(0, 2), 16)
        const localVariable = Runtime.getLocalVariable(index)
        const value = localVariable.get()
        if (value instanceof reference) {
            const heapObject = Runtime.load(value.get())
            Runtime.push(heapObject.get())
        } else Runtime.push(value)
    }
    public override toString(): string {
        const index = Number.parseInt(this.args.substring(0, 2), 16)
        return `${this.newConstant().toString()} : load_${index}}`
    }
    private newConstant(): T {
        return new this.type()
    }
}

export const iload = new xload<int>(int)
export const lload = new xload<long>(long)
export const fload = new xload<float>(float)
export const dload = new xload<double>(double)
export const aload = new xload<reference<any>>(reference)