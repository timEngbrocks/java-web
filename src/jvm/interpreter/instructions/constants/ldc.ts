import { Instruction } from "../../Instruction"
import { OpCodes } from "../opcodes"

export class ldc extends Instruction {
    opcode: number = OpCodes.ldc
    length: number = 2
    args: string = ""

    public override setArgs(args: string): void {
        this.args = args
    }

    public override execute(): void {}

    public override toString(): string {
        return `ldc 0x${this.args.substring(0, 2)}`
    }
}