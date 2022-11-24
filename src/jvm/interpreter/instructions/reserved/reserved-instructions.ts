import { Instruction } from '../../Instruction'
import { OpCodes } from '../opcodes'
import { breakpoint } from './breakpoint'
import { impdep1 } from './impdep1'
import { impdep2 } from './impdep2'

export const getReservedInstructionByCode = (code: string): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.breakpoint: {
			instruction = new breakpoint()
			break
		}
		case OpCodes.impdep1: {
			instruction = new impdep1()
			break
		}
		case OpCodes.impdep2: {
			instruction = new impdep2()
			break
		}
	}
	return instruction
}
