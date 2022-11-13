import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { iadd } from "./iadd";
import { lrem } from "./lrem";

export const getMathInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.lrem: {
            instruction = new lrem()
            break
        }
        case OpCodes.iadd: {
            instruction = new iadd()
            break
        }
    }
    return instruction
}