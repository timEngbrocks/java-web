import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { istore_0, istore_1, istore_2, istore_3 } from "./istore_n";

export const getStoreInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.istore_0: {
            instruction = new istore_0()
            break
        }
        case OpCodes.istore_1: {
            instruction = new istore_1()
            break
        }
        case OpCodes.istore_2: {
            instruction = new istore_2()
            break
        }
        case OpCodes.istore_3: {
            instruction = new istore_3()
            break
        }
    }
    return instruction
}