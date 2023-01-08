import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { aaload, baload, caload, daload, faload, iaload, laload, saload } from './xaload'
import { aload, dload, fload, iload, lload } from './xload'
import { aload_0, aload_1, aload_2, aload_3, dload_0, dload_1, dload_2, dload_3, fload_0, fload_1, fload_2, fload_3, iload_0, iload_1, iload_2, iload_3, lload_0, lload_1, lload_2, lload_3 } from './xload_n'

export const getLoadInstructionByCode = (code: string, _address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.iload: {
			instruction = new iload()
			break
		}
		case OpCodes.lload: {
			instruction = new lload()
			break
		}
		case OpCodes.fload: {
			instruction = new fload()
			break
		}
		case OpCodes.dload: {
			instruction = new dload()
			break
		}
		case OpCodes.aload: {
			instruction = new aload()
			break
		}
		case OpCodes.iload_0: {
			instruction = new iload_0()
			break
		}
		case OpCodes.iload_1: {
			instruction = new iload_1()
			break
		}
		case OpCodes.iload_2: {
			instruction = new iload_2()
			break
		}
		case OpCodes.iload_3: {
			instruction = new iload_3()
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
		case OpCodes.fload_0: {
			instruction = new fload_0()
			break
		}
		case OpCodes.fload_1: {
			instruction = new fload_1()
			break
		}
		case OpCodes.fload_2: {
			instruction = new fload_2()
			break
		}
		case OpCodes.fload_3: {
			instruction = new fload_3()
			break
		}
		case OpCodes.dload_0: {
			instruction = new dload_0()
			break
		}
		case OpCodes.dload_1: {
			instruction = new dload_1()
			break
		}
		case OpCodes.dload_2: {
			instruction = new dload_2()
			break
		}
		case OpCodes.dload_3: {
			instruction = new dload_3()
			break
		}
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
		case OpCodes.iaload: {
			instruction = new iaload()
			break
		}
		case OpCodes.laload: {
			instruction = new laload()
			break
		}
		case OpCodes.faload: {
			instruction = new faload()
			break
		}
		case OpCodes.daload: {
			instruction = new daload()
			break
		}
		case OpCodes.aaload: {
			instruction = new aaload()
			break
		}
		case OpCodes.baload: {
			instruction = new baload()
			break
		}
		case OpCodes.caload: {
			instruction = new caload()
			break
		}
		case OpCodes.saload: {
			instruction = new saload()
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
