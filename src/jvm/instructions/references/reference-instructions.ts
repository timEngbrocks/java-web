import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { invokespecial } from "./invokespecial";
import { invokevirtual } from "./invokevirtual";

export const getReferenceInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.invokespecial: {
            instruction = new invokespecial()
            break
        }
        case OpCodes.invokevirtual: {
            instruction = new invokevirtual()
            break
        }
    }

    if (instruction.length > 2) {
        instruction.setArgs(code.substring(2, instruction.length * 2))
    }

    return instruction
}