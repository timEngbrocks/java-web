import { Reference } from "../../data-types/reference";
import { Instruction } from "../../Instruction";
import { JVMService } from "../../JVM";
import { OpCodes } from "../opcodes";

export class aload_0 extends Instruction {
    opcode: number = OpCodes.aload_0
    length: number = 1
    public override execute(): void {
        const localVariable = JVMService.get().activeFrame.getLocalVariable(0)
        const address = localVariable.get()
        if (!(address instanceof Reference)) throw 'Tried loading non-reference with aload_n'
        const heapObject = JVMService.get().heap.load(address.get())
        JVMService.get().activeFrame.operandStack.push(heapObject.get())
    }
    public override toString(): string {
        return 'aload_0'
    }
}

export class aload_1 extends Instruction {
    opcode: number = OpCodes.aload_1
    length: number = 1
    public override execute(): void {
        const localVariable = JVMService.get().activeFrame.getLocalVariable(1)
        const address = localVariable.get()
        if (!(address instanceof Reference)) throw 'Tried loading non-reference with aload_n'
        const heapObject = JVMService.get().heap.load(address.get())
        JVMService.get().activeFrame.operandStack.push(heapObject.get())
    }
    public override toString(): string {
        return 'aload_1'
    }
}

export class aload_2 extends Instruction {
    opcode: number = OpCodes.aload_2
    length: number = 1
    public override execute(): void {
        const localVariable = JVMService.get().activeFrame.getLocalVariable(2)
        const address = localVariable.get()
        if (!(address instanceof Reference)) throw 'Tried loading non-reference with aload_n'
        const heapObject = JVMService.get().heap.load(address.get())
        JVMService.get().activeFrame.operandStack.push(heapObject.get())
    }
    public override toString(): string {
        return 'aload_2'
    }
}

export class aload_3 extends Instruction {
    opcode: number = OpCodes.aload_3
    length: number = 1
    public override execute(): void {
        const localVariable = JVMService.get().activeFrame.getLocalVariable(3)
        const address = localVariable.get()
        if (!(address instanceof Reference)) throw 'Tried loading non-reference with aload_n'
        const heapObject = JVMService.get().heap.load(address.get())
        JVMService.get().activeFrame.operandStack.push(heapObject.get())
    }
    public override toString(): string {
        return 'aload_3'
    }
}