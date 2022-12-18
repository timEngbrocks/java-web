import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { dup } from './dup'
import { dup2 } from './dup2'
import { dup2_x1 } from './dup2_x1'
import { dup2_x2 } from './dup2_x2'
import { dup_x1 } from './dup_x1'
import { dup_x2 } from './dup_x2'
import { pop } from './pop'
import { pop2 } from './pop2'
import { swap } from './swap'

export const getStackInstructionByCode = (code: string, address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.pop: {
			instruction = new pop()
			break
		}
		case OpCodes.pop2: {
			instruction = new pop2()
			break
		}
		case OpCodes.dup: {
			instruction = new dup()
			break
		}
		case OpCodes.dup_x1: {
			instruction = new dup_x1()
			break
		}
		case OpCodes.dup_x2: {
			instruction = new dup_x2()
			break
		}
		case OpCodes.dup2: {
			instruction = new dup2()
			break
		}
		case OpCodes.dup2_x1: {
			instruction = new dup2_x1()
			break
		}
		case OpCodes.dup2_x2: {
			instruction = new dup2_x2()
			break
		}
		case OpCodes.swap: {
			instruction = new swap()
			break
		}
	}
	return instruction
}
