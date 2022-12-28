import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { iinc } from './iinc'
import { iadd, ladd, fadd, dadd } from './xadd'
import { iand, land } from './xand'
import { idiv, ldiv, fdiv, ddiv } from './xdiv'
import { imul, lmul, fmul, dmul } from './xmul'
import { ineg, lneg, fneg, dneg } from './xneg'
import { ior, lor } from './xor'
import { drem, frem, irem, lrem } from './xrem'
import { ishl, lshl } from './xshl'
import { ishr, lshr } from './xshr'
import { isub, lsub, fsub, dsub } from './xsub'
import { iushr, lushr } from './xushr'
import { ixor, lxor } from './xxor'

export const getMathInstructionByCode = (code: string, address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.iadd: {
			instruction = new iadd()
			break
		}
		case OpCodes.ladd: {
			instruction = new ladd()
			break
		}
		case OpCodes.fadd: {
			instruction = new fadd()
			break
		}
		case OpCodes.dadd: {
			instruction = new dadd()
			break
		}
		case OpCodes.isub: {
			instruction = new isub()
			break
		}
		case OpCodes.lsub: {
			instruction = new lsub()
			break
		}
		case OpCodes.fsub: {
			instruction = new fsub()
			break
		}
		case OpCodes.dsub: {
			instruction = new dsub()
			break
		}
		case OpCodes.imul: {
			instruction = new imul()
			break
		}
		case OpCodes.lmul: {
			instruction = new lmul()
			break
		}
		case OpCodes.fmul: {
			instruction = new fmul()
			break
		}
		case OpCodes.dmul: {
			instruction = new dmul()
			break
		}
		case OpCodes.idiv: {
			instruction = new idiv()
			break
		}
		case OpCodes.ldiv: {
			instruction = new ldiv()
			break
		}
		case OpCodes.fdiv: {
			instruction = new fdiv()
			break
		}
		case OpCodes.ddiv: {
			instruction = new ddiv()
			break
		}
		case OpCodes.irem: {
			instruction = irem
			break
		}
		case OpCodes.lrem: {
			instruction = lrem
			break
		}
		case OpCodes.frem: {
			instruction = frem
			break
		}
		case OpCodes.drem: {
			instruction = drem
			break
		}
		case OpCodes.ineg: {
			instruction = ineg
			break
		}
		case OpCodes.lneg: {
			instruction = lneg
			break
		}
		case OpCodes.fneg: {
			instruction = fneg
			break
		}
		case OpCodes.dneg: {
			instruction = dneg
			break
		}
		case OpCodes.ishl: {
			instruction = ishl
			break
		}
		case OpCodes.lshl: {
			instruction = lshl
			break
		}
		case OpCodes.ishr: {
			instruction = ishr
			break
		}
		case OpCodes.lshr: {
			instruction = lshr
			break
		}
		case OpCodes.iushr: {
			instruction = iushr
			break
		}
		case OpCodes.lushr: {
			instruction = lushr
			break
		}
		case OpCodes.iand: {
			instruction = new iand()
			break
		}
		case OpCodes.land: {
			instruction = new land()
			break
		}
		case OpCodes.ior: {
			instruction = ior
			break
		}
		case OpCodes.lor: {
			instruction = lor
			break
		}
		case OpCodes.ixor: {
			instruction = ixor
			break
		}
		case OpCodes.lxor: {
			instruction = lxor
			break
		}
		case OpCodes.iinc: {
			instruction = new iinc()
			break
		}
	}

	if (instruction.length > 1) {
		instruction.setArgs(code.substring(2, instruction.length * 2))
	}

	return instruction
}
