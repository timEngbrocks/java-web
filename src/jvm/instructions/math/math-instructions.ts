import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { lrem } from "./lrem";

export const getMathInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.lrem: {
            instruction = new lrem()
            break
        }
    }
    return instruction
}