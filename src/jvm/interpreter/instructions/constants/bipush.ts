import { int } from "../../data-types/int"
import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"
import { OpCodes } from "../opcodes"

export class bipush extends Instruction {
    opcode: number = OpCodes.bipush
    length: number = 2
    args: string = ""

    public override setArgs(args: string): void {
        this.args = args
    }

    public override execute(): void {
        if (this.args.length !== 2) throw `Tried calling bipush with incorrect amount of arguments. Expected 2 but found ${this.args.length}`
        const byte = Number.parseInt(this.args.substring(0, 2), 16)
        const value = new int()
        value.set(byte)
        Runtime.push(value)
    }

    public override toString(): string {
        return `bipush 0x${this.args.substring(0, 2)}`
    }
}