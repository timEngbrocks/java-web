import { Instruction } from "../../Instruction"
import { OpCodes } from "../opcodes"

export class Return extends Instruction {
    opcode: number = OpCodes.return
    length: number = 1

    public override execute(): void {}

    public override toString(): string {
        return 'return'
    }
}