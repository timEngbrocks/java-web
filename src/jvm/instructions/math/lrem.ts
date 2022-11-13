import { long } from "../../data-types/long"
import { ArithmeticException } from "../../exceptions/ArithmeticException"
import { Instruction } from "../../Instruction"
import { JVMService } from "../../JVM"
import { OpCodes } from "../opcodes"

export class lrem extends Instruction {
    opcode: number = OpCodes.lrem
    length: number = 1
    public override execute(): void {
        const a = JVMService.get().activeFrame.operandStack.pop()
        const b = JVMService.get().activeFrame.operandStack.pop()
        if (!(a instanceof long && b instanceof long)) throw `lrem only supports long but found: a: ${a}, b: ${b}`
        if (b.get() === 0n) throw ArithmeticException.divisionByZero()
        const result = new long()
        result.set(a.get() - (a.get() / b.get()) * b.get())
        JVMService.get().activeFrame.operandStack.push(result)
    }
    public override toString(): string {
        return 'lrem'
    }
}