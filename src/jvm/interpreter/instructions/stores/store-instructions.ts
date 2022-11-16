import { Instruction } from "../../Instruction";
import { OpCodes } from "../opcodes";
import { aastore, bastore, castore, dastore, fastore, iastore, lastore, sastore } from "./xastore";
import { astore, dstore, fstore, istore, lstore } from "./xstore";
import { astore_0, astore_1, astore_2, astore_3, dstore_0, dstore_1, dstore_2, dstore_3, fstore_0, fstore_1, fstore_2, fstore_3, istore_0, istore_1, istore_2, istore_3, lstore_0, lstore_1, lstore_2, lstore_3 } from "./xstore_n";

export const getStoreInstructionByCode = (code: string): Instruction => {
    const opcode = Number.parseInt(code.substring(0, 2), 16)
    let instruction = new Instruction()
    switch (opcode) {
        case OpCodes.istore: {
            instruction = istore
            break
        }
        case OpCodes.lstore: {
            instruction = lstore
            break
        }
        case OpCodes.fstore: {
            instruction = fstore
            break
        }
        case OpCodes.dstore: {
            instruction = dstore
            break
        }
        case OpCodes.astore: {
            instruction = astore
            break
        }
        case OpCodes.istore_0: {
            instruction = istore_0
            break
        }
        case OpCodes.istore_1: {
            instruction = istore_1
            break
        }
        case OpCodes.istore_2: {
            instruction = istore_2
            break
        }
        case OpCodes.istore_3: {
            instruction = istore_3
            break
        }
        case OpCodes.lstore_0: {
            instruction = lstore_0
            break
        }
        case OpCodes.lstore_1: {
            instruction = lstore_1
            break
        }
        case OpCodes.lstore_2: {
            instruction = lstore_2
            break
        }
        case OpCodes.lstore_3: {
            instruction = lstore_3
            break
        }
        case OpCodes.fstore_0: {
            instruction = fstore_0
            break
        }
        case OpCodes.fstore_1: {
            instruction = fstore_1
            break
        }
        case OpCodes.fstore_2: {
            instruction = fstore_2
            break
        }
        case OpCodes.fstore_3: {
            instruction = fstore_3
            break
        }
        case OpCodes.dstore_0: {
            instruction = dstore_0
            break
        }
        case OpCodes.dstore_1: {
            instruction = dstore_1
            break
        }
        case OpCodes.dstore_2: {
            instruction = dstore_2
            break
        }
        case OpCodes.dstore_3: {
            instruction = dstore_3
            break
        }
        case OpCodes.astore_0: {
            instruction = astore_0
            break
        }
        case OpCodes.astore_1: {
            instruction = astore_1
            break
        }
        case OpCodes.astore_2: {
            instruction = astore_2
            break
        }
        case OpCodes.astore_3: {
            instruction = astore_3
            break
        }
        case OpCodes.iastore: {
            instruction = iastore
            break
        }
        case OpCodes.lastore: {
            instruction = lastore
            break
        }
        case OpCodes.fastore: {
            instruction = fastore
            break
        }
        case OpCodes.dastore: {
            instruction = dastore
            break
        }
        case OpCodes.aastore: {
            instruction = aastore
            break
        }
        case OpCodes.bastore: {
            instruction = bastore
            break
        }
        case OpCodes.castore: {
            instruction = castore
            break
        }
        case OpCodes.sastore: {
            instruction = sastore
            break
        }
    }

    if (instruction.length > 1) {
        instruction.setArgs(code.substring(2, instruction.length * 2))
    }

    return instruction
}