import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { bipush } from "./bipush";
import { fconst_0, fconst_1, fconst_2 } from "./fconst_n";
import { iconst_0, iconst_1, iconst_2, iconst_3, iconst_4, iconst_5, iconst_m1 } from "./iconst_i";
import { ldc } from "./ldc";
import { nop } from "./nop";
import { sipush } from "./sipush";

export const getConstantInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.nop: {
            instruction = new nop()
            break
        }
        case OpCodes.ldc: {
            instruction = new ldc()
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
        case OpCodes.iconst_0: {
            instruction = new iconst_0()
            break
        }
        case OpCodes.iconst_1: {
            instruction = new iconst_1()
            break
        }
        case OpCodes.iconst_2: {
            instruction = new iconst_2()
            break
        }
        case OpCodes.iconst_3: {
            instruction = new iconst_3()
            break
        }
        case OpCodes.iconst_4: {
            instruction = new iconst_4()
            break
        }
        case OpCodes.iconst_5: {
            instruction = new iconst_5()
            break
        }
        case OpCodes.iconst_m1: {
            instruction = new iconst_m1()
            break
        }
        case OpCodes.bipush: {
            instruction = new bipush()
            break
        }
        case OpCodes.sipush: {
            instruction = new sipush()
            break
        }
    }

    if (instruction.length > 1) {
        instruction.setArgs(code.substring(2, instruction.length * 2))
    }

    return instruction
}