import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { goto_w } from './goto_w'
import { ifnonnull } from './ifnonnull'
import { ifnull } from './ifnull'
import { jsr_w } from './jsr_w'
import { multianewarray } from './multianewarray'
import { wide } from './wide'

export const getExtendedInstructionByCode = (code: string, address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.wide: {
			instruction = new wide()
			break
		}
		case OpCodes.multianewarray: {
			instruction = new multianewarray()
			break
		}
		case OpCodes.ifnull: {
			instruction = new ifnull()
			break
		}
		case OpCodes.ifnonnull: {
			instruction = new ifnonnull()
			break
		}
		case OpCodes.goto_w: {
			instruction = new goto_w()
			break
		}
		case OpCodes.jsr_w: {
			instruction = new jsr_w()
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
