import { OpCodes } from "./instructions/opcodes"

export class Instruction {
    opcode: number = OpCodes.invalid
    length: number = 0
    args: string = ""
    public setArgs(args: string): void {}
    public execute(): void {}
    public toString(): string {
        return 'invalid'
    }
}