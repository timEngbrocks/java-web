import { Instruction } from "../../Instruction"
import { OpCodes } from "../opcodes"

export class invokevirtual extends Instruction {
    opcode: number = OpCodes.invokevirtual
    length: number = 3
    public override execute(): void {}
    public override toString(): string {
        return `invokevirtual 0x${this.args.substring(0, 2)} 0x${this.args.substring(2)}`
    }
}