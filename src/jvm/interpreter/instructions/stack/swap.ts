import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"
import { OpCodes } from "../opcodes"

export class swap extends Instruction {
    opcode: number = OpCodes.swap
    length: number = 1

    public override execute(): void {
        const value1 = Runtime.pop()
        const value2 = Runtime.pop()
        Runtime.push(value1)
        Runtime.push(value2)
    }

    public override toString(): string {
        return 'swap'
    }
}