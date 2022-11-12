import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { fconst_0, fconst_1, fconst_2 } from "./fconst_n";
import { nop } from "./nop";

export const getConstantInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.nop: {
            instruction = new nop()
            break
        }
        case OpCodes.fconst_0: {
            instruction = new fconst_0()
            break
        }
        case OpCodes.fconst_1: {
            instruction = new fconst_1()
            break
        }
        case OpCodes.fconst_2: {
            instruction = new fconst_2()
            break
        }
    }
    return instruction
}