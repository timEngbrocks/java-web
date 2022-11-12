import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { aload_0, aload_1, aload_2, aload_3 } from "./aload_n";
import { lload_0, lload_1, lload_2, lload_3 } from "./lload_n";

export const getLoadInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.aload_0: {
            instruction = new aload_0()
            break
        }
        case OpCodes.aload_1: {
            instruction = new aload_1()
            break
        }
        case OpCodes.aload_2: {
            instruction = new aload_2()
            break
        }
        case OpCodes.aload_3: {
            instruction = new aload_3()
            break
        }
        case OpCodes.lload_0: {
            instruction = new lload_0()
            break
        }
        case OpCodes.lload_1: {
            instruction = new lload_1()
            break
        }
        case OpCodes.lload_2: {
            instruction = new lload_2()
            break
        }
        case OpCodes.lload_3: {
            instruction = new lload_3()
            break
        }
    }
    return instruction
}