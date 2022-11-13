import { float } from "../../data-types/float";
import { Instruction } from "../../Instruction";
import { JVMService } from "../../JVM";
import { OpCodes } from "../opcodes";

export class fconst_0 extends Instruction {
    opcode: number = OpCodes.fconst_0
    length: number = 1
    public override execute(): void {
        const f = new float()
        f.set(0)
        JVMService.get().activeFrame.operandStack.push(f)
    }
    public override toString(): string {
        return 'fconst_0'
    }
}

export class fconst_1 extends Instruction {
    opcode: number = OpCodes.fconst_1
    length: number = 1
    public override execute(): void {
        const f = new float()
        f.set(1)
        JVMService.get().activeFrame.operandStack.push(f)
    }
    public override toString(): string {
        return 'fconst_1'
    }
}

export class fconst_2 extends Instruction {
    opcode: number = OpCodes.fconst_2
    length: number = 1
    public override execute(): void {
        const f = new float()
        f.set(2)
        JVMService.get().activeFrame.operandStack.push(f)
    }
    public override toString(): string {
        return 'fconst_2'
    }
}