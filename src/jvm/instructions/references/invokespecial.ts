import { Instruction } from "../../Instruction"
import { OpCodes } from "../opcodes"

export class invokespecial extends Instruction {
    opcode: number = OpCodes.invokespecial
    length: number = 3
    args: string = ""

    public override setArgs(args: string): void {
        this.args = args
    }

    public override execute(): void {}

    public override toString(): string {
        return `invokespecial 0x${this.args.substring(0, 2)} 0x${this.args.substring(2)}`
    }
}