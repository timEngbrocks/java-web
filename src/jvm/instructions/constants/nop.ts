import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";

export class nop extends Instruction {
    opcode: number = OpCodes.nop
    length: number = 2
    public override execute(): void {}
    public override toString(): string {
        return 'nop'
    }
}