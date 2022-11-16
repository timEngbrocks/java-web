import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { bipush } from "./bipush";
import { dconst_0, dconst_1, fconst_0, fconst_1, fconst_2, iconst_0, iconst_1, iconst_2, iconst_3, iconst_4, iconst_5, iconst_m1, lconst_0, lconst_1 } from "./xconst_n";
import { ldc } from "./ldc";
import { nop } from "./nop";
import { sipush } from "./sipush";
import { aconst_null } from "./aconst_null";
import { ldc_w } from "./ldc_w";
import { ldc2_w } from "./ldc2_w";

export const getConstantInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.nop: {
            instruction = new nop()
            break
        }
        case OpCodes.aconst_null: {
            instruction = new aconst_null()
            break
        }
        case OpCodes.iconst_m1: {
            instruction = iconst_m1
            break
        }
        case OpCodes.iconst_0: {
            instruction = iconst_0
            break
        }
        case OpCodes.iconst_1: {
            instruction = iconst_1
            break
        }
        case OpCodes.iconst_2: {
            instruction = iconst_2
            break
        }
        case OpCodes.iconst_3: {
            instruction = iconst_3
            break
        }
        case OpCodes.iconst_4: {
            instruction = iconst_4
            break
        }
        case OpCodes.iconst_5: {
            instruction = iconst_5
            break
        }
        case OpCodes.lconst_0: {
            instruction = lconst_0
            break
        }
        case OpCodes.lconst_1: {
            instruction = lconst_1
            break
        }
        case OpCodes.fconst_0: {
            instruction = fconst_0
            break
        }
        case OpCodes.fconst_1: {
            instruction = fconst_1
            break
        }
        case OpCodes.fconst_2: {
            instruction = fconst_2
            break
        }
        case OpCodes.dconst_0: {
            instruction = dconst_0
            break
        }
        case OpCodes.dconst_1: {
            instruction = dconst_1
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
        case OpCodes.ldc: {
            instruction = new ldc()
            break
        }
        case OpCodes.ldc_w: {
            instruction = new ldc_w()
            break
        }
        case OpCodes.ldc2_w: {
            instruction = new ldc2_w()
            break
        }
    }

    if (instruction.length > 1) {
        instruction.setArgs(code.substring(2, instruction.length * 2))
    }

    return instruction
}