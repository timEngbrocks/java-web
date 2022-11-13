import { int } from "../../data-types/int"
import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"
import { OpCodes } from "../opcodes"

export class iadd extends Instruction {
    opcode: number = OpCodes.lrem
    length: number = 1
    public override execute(): void {
        const value1 = Runtime.pop()
        const value2 = Runtime.pop()
        if (!(value1 instanceof int && value2 instanceof int)) throw 'Tried using iadd to add non ints'
        const result = new int()
        result.set(value1.get() + value2.get())
        Runtime.push(result)
    }
    public override toString(): string {
        return 'iadd'
    }
}