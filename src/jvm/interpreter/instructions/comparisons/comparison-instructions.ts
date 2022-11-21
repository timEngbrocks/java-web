import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { ifeq, ifge, ifgt, ifle, iflt, ifne } from "./ifop";
import { if_acmpeq, if_acmpne } from "./if_acmpop";
import { if_icmpeq, if_icmpne, if_icmplt, if_icmpge, if_icmpgt, if_icmple } from "./if_icmpop";
import { dcmpg, dcmpl, fcmpg, fcmpl, lcmp } from "./xcmp";

export const getComparisonInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.lcmp: {
            instruction = lcmp
            break
        }
        case OpCodes.fcmpl: {
            instruction = fcmpl
            break
        }
        case OpCodes.fcmpg: {
            instruction = fcmpg
            break
        }
        case OpCodes.dcmpl: {
            instruction = dcmpl
            break
        }
        case OpCodes.dcmpg: {
            instruction = dcmpg
            break
        }
        case OpCodes.ifeq: {
            instruction = ifeq
            break
        }
        case OpCodes.ifne: {
            instruction = ifne
            break
        }
        case OpCodes.iflt: {
            instruction = iflt
            break
        }
        case OpCodes.ifge: {
            instruction = ifge
            break
        }
        case OpCodes.ifgt: {
            instruction = ifgt
            break
        }
        case OpCodes.ifle: {
            instruction = ifle
            break
        }
        case OpCodes.if_icmpeq: {
            instruction = if_icmpeq
            break
        }
        case OpCodes.if_icmpne: {
            instruction = if_icmpne
            break
        }
        case OpCodes.if_icmplt: {
            instruction = if_icmplt
            break
        }
        case OpCodes.if_icmpge: {
            instruction = if_icmpge
            break
        }
        case OpCodes.if_icmpgt: {
            instruction = if_icmpgt
            break
        }
        case OpCodes.if_icmple: {
            instruction = if_icmple
            break
        }
        case OpCodes.if_acmpeq: {
            instruction = if_acmpeq
            break
        }
        case OpCodes.if_acmpne: {
            instruction = if_acmpne
            break
        }
    }

    if (instruction.length > 1) {
        instruction.setArgs(code.substring(2, instruction.length * 2))
    }

    return instruction
}