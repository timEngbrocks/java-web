import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"
import { OpCodes } from "../opcodes"

export class dup_x1 extends Instruction {
    opcode: number = OpCodes.dup_x1
    length: number = 1

    public override execute(): void {
        const value1 = Runtime.pop()
        const value2 = Runtime.pop()
        Runtime.push(value1)
        Runtime.push(value2)
        Runtime.push(value1)
    }

    public override toString(): string {
        return 'dup_x1'
    }
}