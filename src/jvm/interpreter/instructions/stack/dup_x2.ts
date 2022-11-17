import { double } from "../../data-types/double"
import { long } from "../../data-types/long"
import { Instruction } from "../../Instruction"
import { Runtime } from "../../Runtime"
import { OpCodes } from "../opcodes"

export class dup_x2 extends Instruction {
    opcode: number = OpCodes.dup_x2
    length: number = 1

    public override execute(): void {
        const value1 = Runtime.pop()
        const value2 = Runtime.pop()
        if (value2 instanceof long || value2 instanceof double) {
            Runtime.push(value1)
            Runtime.push(value2)
            Runtime.push(value1)
        } else {
            const value3 = Runtime.pop()
            Runtime.push(value1)
            Runtime.push(value3)
            Runtime.push(value2)
            Runtime.push(value1)
        }
    }

    public override toString(): string {
        return 'dup_x2'
    }
}