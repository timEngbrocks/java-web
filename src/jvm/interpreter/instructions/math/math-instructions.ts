import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { iadd, ladd, fadd, dadd } from "./xadd";
import { idiv, ldiv, fdiv, ddiv } from "./xdiv";
import { imul, lmul, fmul, dmul } from "./xmul";
import { isub, lsub, fsub, dsub } from "./xsub";

export const getMathInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.iadd: {
            instruction = iadd
            break
        }
        case OpCodes.ladd: {
            instruction = ladd
            break
        }
        case OpCodes.fadd: {
            instruction = fadd
            break
        }
        case OpCodes.dadd: {
            instruction = dadd
            break
        }
        case OpCodes.isub: {
            instruction = isub
            break
        }
        case OpCodes.lsub: {
            instruction = lsub
            break
        }
        case OpCodes.fsub: {
            instruction = fsub
            break
        }
        case OpCodes.dsub: {
            instruction = dsub
            break
        }
        case OpCodes.imul: {
            instruction = imul
            break
        }
        case OpCodes.lmul: {
            instruction = lmul
            break
        }
        case OpCodes.fmul: {
            instruction = fmul
            break
        }
        case OpCodes.dmul: {
            instruction = dmul
            break
        }
        case OpCodes.idiv: {
            instruction = idiv
            break
        }
        case OpCodes.ldiv: {
            instruction = ldiv
            break
        }
        case OpCodes.fdiv: {
            instruction = fdiv
            break
        }
        case OpCodes.ddiv: {
            instruction = ddiv
            break
        }
    }
    return instruction
}