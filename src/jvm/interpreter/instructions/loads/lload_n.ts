import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";
import { OpCodes } from "../opcodes";

export class lload_0 extends Instruction {
    opcode: number = OpCodes.lload_0
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(0)
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'lload_0'
    }
}

export class lload_1 extends Instruction {
    opcode: number = OpCodes.lload_1
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(1)
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'lload_1'
    }
}

export class lload_2 extends Instruction {
    opcode: number = OpCodes.lload_2
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(2)
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'lload_2'
    }
}

export class lload_3 extends Instruction {
    opcode: number = OpCodes.lload_3
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(3)
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'lload_3'
    }
}