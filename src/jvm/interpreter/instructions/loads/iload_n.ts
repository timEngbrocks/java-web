import { int } from "../../data-types/int";
import { Reference } from "../../data-types/reference";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";
import { OpCodes } from "../opcodes";

export class iload_0 extends Instruction {
    opcode: number = OpCodes.iload_0
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(0)
        if (!(localVariable.get() instanceof int)) throw 'Tried loading non int value with iload_n'
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'iload_0'
    }
}

export class iload_1 extends Instruction {
    opcode: number = OpCodes.iload_1
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(1)
        if (!(localVariable.get() instanceof int)) throw 'Tried loading non int value with iload_n'
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'iload_1'
    }
}

export class iload_2 extends Instruction {
    opcode: number = OpCodes.iload_2
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(2)
        if (!(localVariable.get() instanceof int)) throw 'Tried loading non int value with iload_n'
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'iload_2'
    }
}

export class iload_3 extends Instruction {
    opcode: number = OpCodes.iload_3
    length: number = 1
    public override execute(): void {
        const localVariable = Runtime.getLocalVariable(3)
        if (!(localVariable.get() instanceof int)) throw 'Tried loading non int value with iload_n'
        Runtime.push(localVariable.get())
    }
    public override toString(): string {
        return 'iload_3'
    }
}