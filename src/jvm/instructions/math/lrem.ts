import { Instruction } from "../../Instruction"
import { OpCodes } from "../opcodes"

export class lrem extends Instruction {
    opcode: number = OpCodes.lrem
    length: number = 1
    public override execute(): void {}
    public override toString(): string {
        return 'lrem'
    }
}