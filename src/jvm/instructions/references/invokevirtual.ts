import { Instruction } from "../../Instruction"
import { OpCodes } from "../opcodes"

export class invokevirtual extends Instruction {
    opcode: number = OpCodes.invokevirtual
    length: number = 6
    public override execute(): void {}
    public override toString(): string {
        return `invokevirtual ${this.args.substring(0, 2)} ${this.args.substring(2)}`
    }
}