import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { Return } from "./return";

export const getControlInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.return: {
            instruction = new Return()
            break
        }
    }

    return instruction
}