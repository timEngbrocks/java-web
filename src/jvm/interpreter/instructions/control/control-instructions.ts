import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { goto } from "./goto";
import { jsr } from "./jsr";
import { lookupswitch } from "./lookupswitch";
import { ret } from "./ret";
import { tableswitch } from "./tableswitch";
import { areturn, dreturn, freturn, ireturn, lreturn, Return } from "./xreturn";

export const getControlInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.goto: {
            instruction = new goto()
            break
        }
        case OpCodes.jsr: {
            instruction = new jsr()
            break
        }
        case OpCodes.ret: {
            instruction = new ret()
            break
        }
        case OpCodes.tableswitch: {
            instruction = new tableswitch()
            break
        }
        case OpCodes.lookupswitch: {
            instruction = new lookupswitch()
            break
        }
        case OpCodes.ireturn: {
            instruction = ireturn
            break
        }
        case OpCodes.lreturn: {
            instruction = lreturn
            break
        }
        case OpCodes.freturn: {
            instruction = freturn
            break
        }
        case OpCodes.dreturn: {
            instruction = dreturn
            break
        }
        case OpCodes.areturn: {
            instruction = areturn
            break
        }
        case OpCodes.return: {
            instruction = Return
            break
        }
    }

    if (instruction.length > 1) {
        instruction.setArgs(code.substring(2, instruction.length * 2))
    } else if (instruction.length < 0) {
        instruction.setArgs(code.substring(2))
    }

    return instruction
}