import { long } from "../../data-types/long"
import { ArithmeticException } from "../../exceptions/ArithmeticException"
import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"
import { OpCodes } from "../opcodes"

export class lrem extends Instruction {
    opcode: number = OpCodes.lrem
    length: number = 1
    public override execute(): void {
        const a = Runtime.pop()
        const b = Runtime.pop()
        if (!(a instanceof long && b instanceof long)) throw `lrem only supports long but found: a: ${a}, b: ${b}`
        if (b.get() === 0n) throw ArithmeticException.divisionByZero()
        const result = new long()
        result.set(a.get() - (a.get() / b.get()) * b.get())
        Runtime.push(result)
    }
    public override toString(): string {
        return 'lrem'
    }
}