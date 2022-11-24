import { Instruction } from '../../Instruction'
import { OpCodes } from '../opcodes'
import { getfield } from './getfield'
import { getstatic } from './getstatic'
import { invokeinterface } from './invokeinterface'
import { invokespecial } from './invokespecial'
import { invokestatic } from './invokestatic'
import { invokevirtual } from './invokevirtual'
import { putfield } from './putfield'
import { putstatic } from './putstatic'

export const getReferenceInstructionByCode = (code: string): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.getstatic: {
			instruction = new getstatic()
			break
		}
		case OpCodes.putstatic: {
			instruction = new putstatic()
			break
		}
		case OpCodes.getfield: {
			instruction = new getfield()
			break
		}
		case OpCodes.putfield: {
			instruction = new putfield()
			break
		}
		case OpCodes.invokevirtual: {
			instruction = new invokevirtual()
			break
		}
		case OpCodes.invokespecial: {
			instruction = new invokespecial()
			break
		}
		case OpCodes.invokestatic: {
			instruction = new invokestatic()
			break
		}
		case OpCodes.invokeinterface: {
			instruction = new invokeinterface()
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
