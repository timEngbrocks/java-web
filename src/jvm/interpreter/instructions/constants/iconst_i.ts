import { float } from "../../data-types/float";
import { int } from "../../data-types/int";
import { Instruction } from "../../Instruction";
import { Runtime } from "../../Runtime";
import { OpCodes } from "../opcodes";

export class iconst_0 extends Instruction {
    opcode: number = OpCodes.iconst_0
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(0)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_0'
    }

}

export class iconst_1 extends Instruction {
    opcode: number = OpCodes.iconst_1
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(1)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_1'
    }

}

export class iconst_2 extends Instruction {
    opcode: number = OpCodes.iconst_2
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(2)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_2'
    }

}

export class iconst_3 extends Instruction {
    opcode: number = OpCodes.iconst_3
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(3)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_3'
    }

}

export class iconst_4 extends Instruction {
    opcode: number = OpCodes.iconst_4
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(4)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_4'
    }

}

export class iconst_5 extends Instruction {
    opcode: number = OpCodes.iconst_5
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(5)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_5'
    }

}

export class iconst_m1 extends Instruction {
    opcode: number = OpCodes.iconst_m1
    length: number = 1
    public override execute(): void {
        const i = new int()
        i.set(-1)
        Runtime.push(i)
    }
    public override toString(): string {
        return 'iconst_m1'
    }

}