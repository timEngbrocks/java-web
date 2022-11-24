import { Instruction } from '../../Instruction'
import { OpCodes } from '../opcodes'
import { aaload, baload, caload, daload, faload, iaload, laload, saload } from './xaload'
import { aload, dload, fload, iload, lload } from './xload'
import { aload_0, aload_1, aload_2, aload_3, dload_0, dload_1, dload_2, dload_3, fload_1, fload_2, fload_3, iload_0, iload_1, iload_2, iload_3, lload_0, lload_1, lload_2, lload_3 } from './xload_n'

export const getLoadInstructionByCode = (code: string): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.iload: {
			instruction = iload
			break
		}
		case OpCodes.lload: {
			instruction = lload
			break
		}
		case OpCodes.fload: {
			instruction = fload
			break
		}
		case OpCodes.dload: {
			instruction = dload
			break
		}
		case OpCodes.aload: {
			instruction = aload
			break
		}
		case OpCodes.iload_0: {
			instruction = iload_0
			break
		}
		case OpCodes.iload_1: {
			instruction = iload_1
			break
		}
		case OpCodes.iload_2: {
			instruction = iload_2
			break
		}
		case OpCodes.iload_3: {
			instruction = iload_3
			break
		}
		case OpCodes.lload_0: {
			instruction = lload_0
			break
		}
		case OpCodes.lload_1: {
			instruction = lload_1
			break
		}
		case OpCodes.lload_2: {
			instruction = lload_2
			break
		}
		case OpCodes.lload_3: {
			instruction = lload_3
			break
		}
		case OpCodes.fload_0: {
			instruction = lload_0
			break
		}
		case OpCodes.fload_1: {
			instruction = fload_1
			break
		}
		case OpCodes.fload_2: {
			instruction = fload_2
			break
		}
		case OpCodes.fload_3: {
			instruction = fload_3
			break
		}
		case OpCodes.dload_0: {
			instruction = dload_0
			break
		}
		case OpCodes.dload_1: {
			instruction = dload_1
			break
		}
		case OpCodes.dload_2: {
			instruction = dload_2
			break
		}
		case OpCodes.dload_3: {
			instruction = dload_3
			break
		}
		case OpCodes.aload_0: {
			instruction = aload_0
			break
		}
		case OpCodes.aload_1: {
			instruction = aload_1
			break
		}
		case OpCodes.aload_2: {
			instruction = aload_2
			break
		}
		case OpCodes.aload_3: {
			instruction = aload_3
			break
		}
		case OpCodes.iaload: {
			instruction = iaload
			break
		}
		case OpCodes.laload: {
			instruction = laload
			break
		}
		case OpCodes.faload: {
			instruction = faload
			break
		}
		case OpCodes.daload: {
			instruction = daload
			break
		}
		case OpCodes.aaload: {
			instruction = aaload
			break
		}
		case OpCodes.baload: {
			instruction = baload
			break
		}
		case OpCodes.caload: {
			instruction = caload
			break
		}
		case OpCodes.saload: {
			instruction = saload
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
