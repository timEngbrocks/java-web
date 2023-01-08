import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { aastore, bastore, castore, dastore, fastore, iastore, lastore, sastore } from './xastore'
import { astore, dstore, fstore, istore, lstore } from './xstore'
import { astore_0, astore_1, astore_2, astore_3, dstore_0, dstore_1, dstore_2, dstore_3, fstore_0, fstore_1, fstore_2, fstore_3, istore_0, istore_1, istore_2, istore_3, lstore_0, lstore_1, lstore_2, lstore_3 } from './xstore_n'

export const getStoreInstructionByCode = (code: string, _address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.istore: {
			instruction = new istore()
			break
		}
		case OpCodes.lstore: {
			instruction = new lstore()
			break
		}
		case OpCodes.fstore: {
			instruction = new fstore()
			break
		}
		case OpCodes.dstore: {
			instruction = new dstore()
			break
		}
		case OpCodes.astore: {
			instruction = new astore()
			break
		}
		case OpCodes.istore_0: {
			instruction = new istore_0()
			break
		}
		case OpCodes.istore_1: {
			instruction = new istore_1()
			break
		}
		case OpCodes.istore_2: {
			instruction = new istore_2()
			break
		}
		case OpCodes.istore_3: {
			instruction = new istore_3()
			break
		}
		case OpCodes.lstore_0: {
			instruction = new lstore_0()
			break
		}
		case OpCodes.lstore_1: {
			instruction = new lstore_1()
			break
		}
		case OpCodes.lstore_2: {
			instruction = new lstore_2()
			break
		}
		case OpCodes.lstore_3: {
			instruction = new lstore_3()
			break
		}
		case OpCodes.fstore_0: {
			instruction = new fstore_0()
			break
		}
		case OpCodes.fstore_1: {
			instruction = new fstore_1()
			break
		}
		case OpCodes.fstore_2: {
			instruction = new fstore_2()
			break
		}
		case OpCodes.fstore_3: {
			instruction = new fstore_3()
			break
		}
		case OpCodes.dstore_0: {
			instruction = new dstore_0()
			break
		}
		case OpCodes.dstore_1: {
			instruction = new dstore_1()
			break
		}
		case OpCodes.dstore_2: {
			instruction = new dstore_2()
			break
		}
		case OpCodes.dstore_3: {
			instruction = new dstore_3()
			break
		}
		case OpCodes.astore_0: {
			instruction = new astore_0()
			break
		}
		case OpCodes.astore_1: {
			instruction = new astore_1()
			break
		}
		case OpCodes.astore_2: {
			instruction = new astore_2()
			break
		}
		case OpCodes.astore_3: {
			instruction = new astore_3()
			break
		}
		case OpCodes.iastore: {
			instruction = new iastore()
			break
		}
		case OpCodes.lastore: {
			instruction = new lastore()
			break
		}
		case OpCodes.fastore: {
			instruction = new fastore()
			break
		}
		case OpCodes.dastore: {
			instruction = new dastore()
			break
		}
		case OpCodes.aastore: {
			instruction = new aastore()
			break
		}
		case OpCodes.bastore: {
			instruction = new bastore()
			break
		}
		case OpCodes.castore: {
			instruction = new castore()
			break
		}
		case OpCodes.sastore: {
			instruction = new sastore()
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
