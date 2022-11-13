import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";

export class aload_0 extends Instruction {
    opcode: number = OpCodes.aload_0
    length: number = 1
    public override execute(): void {}
    public override toString(): string {
        return 'aload_0'
    }
}

export class aload_1 extends Instruction {
    opcode: number = OpCodes.aload_1
    length: number = 1
    public override execute(): void {}
    public override toString(): string {
        return 'aload_1'
    }
}

export class aload_2 extends Instruction {
    opcode: number = OpCodes.aload_2
    length: number = 1
    public override execute(): void {}
    public override toString(): string {
        return 'aload_2'
    }
}

export class aload_3 extends Instruction {
    opcode: number = OpCodes.aload_3
    length: number = 1
    public override execute(): void {}
    public override toString(): string {
        return 'aload_3'
    }
}