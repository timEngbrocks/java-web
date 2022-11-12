import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";

export class fconst_0 extends Instruction {
    opcode: number = OpCodes.fconst_0
    length: number = 2
    public override execute(): void {}
    public override toString(): string {
        return 'fconst_0'
    }
}

export class fconst_1 extends Instruction {
    opcode: number = OpCodes.fconst_1
    length: number = 2
    public override execute(): void {}
    public override toString(): string {
        return 'fconst_1'
    }
}

export class fconst_2 extends Instruction {
    opcode: number = OpCodes.fconst_2
    length: number = 2
    public override execute(): void {}
    public override toString(): string {
        return 'fconst_2'
    }
}