import { int } from "../../data-types/int";
import { Instruction } from "../../Instruction";
import { LocalVariable } from "../../memory/local-variable";
import { Runtime } from "../../Runtime";
import { OpCodes } from "../opcodes";

export class istore_0 extends Instruction {
    opcode: number = OpCodes.istore_0
    length: number = 1
    public override execute(): void {
        const value = Runtime.pop()
        if (!(value instanceof int)) throw 'Tried using istore_n to store non int value'
        Runtime.setLocalVariable(new LocalVariable(value), 0)
    }
    public override toString(): string {
        return 'istore_0'
    }
}

export class istore_1 extends Instruction {
    opcode: number = OpCodes.istore_1
    length: number = 1
    public override execute(): void {
        const value = Runtime.pop()
        if (!(value instanceof int)) throw 'Tried using istore_n to store non int value'
        Runtime.setLocalVariable(new LocalVariable(value), 1)
    }
    public override toString(): string {
        return 'istore_1'
    }
}

export class istore_2 extends Instruction {
    opcode: number = OpCodes.istore_2
    length: number = 1
    public override execute(): void {
        const value = Runtime.pop()
        if (!(value instanceof int)) throw 'Tried using istore_n to store non int value'
        Runtime.setLocalVariable(new LocalVariable(value), 2)
    }
    public override toString(): string {
        return 'istore_0'
    }
}

export class istore_3 extends Instruction {
    opcode: number = OpCodes.istore_3
    length: number = 1
    public override execute(): void {
        const value = Runtime.pop()
        if (!(value instanceof int)) throw 'Tried using istore_n to store non int value'
        Runtime.setLocalVariable(new LocalVariable(value), 3)
    }
    public override toString(): string {
        return 'istore_3'
    }
}