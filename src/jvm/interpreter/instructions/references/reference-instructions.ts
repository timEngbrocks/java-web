import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { anewarray } from './anewarray'
import { arraylength } from './arraylength'
import { athrow } from './athrow'
import { checkcast } from './checkcast'
import { getfield } from './getfield'
import { getstatic } from './getstatic'
import { Instanceof } from './instanceof'
import { invokedynamic } from './invokedynamic'
import { invokeinterface } from './invokeinterface'
import { invokespecial } from './invokespecial'
import { invokestatic } from './invokestatic'
import { invokevirtual } from './invokevirtual'
import { monitorenter } from './monitorenter'
import { monitorexit } from './monitorexit'
import { New } from './new'
import { newarray } from './newarray'
import { putfield } from './putfield'
import { putstatic } from './putstatic'

export const getReferenceInstructionByCode = (code: string, address: number): Instruction => {
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
		case OpCodes.invokedynamic: {
			instruction = new invokedynamic()
			break
		}
		case OpCodes.new: {
			instruction = new New()
			break
		}
		case OpCodes.newarray: {
			instruction = new newarray()
			break
		}
		case OpCodes.anewarray: {
			instruction = new anewarray()
			break
		}
		case OpCodes.arraylength: {
			instruction = new arraylength()
			break
		}
		case OpCodes.athrow: {
			instruction = new athrow()
			break
		}
		case OpCodes.checkcast: {
			instruction = new checkcast()
			break
		}
		case OpCodes.instanceof: {
			instruction = new Instanceof()
			break
		}
		case OpCodes.monitorenter: {
			instruction = new monitorenter()
			break
		}
		case OpCodes.monitorexit: {
			instruction = new monitorexit()
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
