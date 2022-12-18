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
			instruction = iadd
			break
		}
		case OpCodes.ladd: {
			instruction = ladd
			break
		}
		case OpCodes.fadd: {
			instruction = fadd
			break
		}
		case OpCodes.dadd: {
			instruction = dadd
			break
		}
		case OpCodes.isub: {
			instruction = isub
			break
		}
		case OpCodes.lsub: {
			instruction = lsub
			break
		}
		case OpCodes.fsub: {
			instruction = fsub
			break
		}
		case OpCodes.dsub: {
			instruction = dsub
			break
		}
		case OpCodes.imul: {
			instruction = imul
			break
		}
		case OpCodes.lmul: {
			instruction = lmul
			break
		}
		case OpCodes.fmul: {
			instruction = fmul
			break
		}
		case OpCodes.dmul: {
			instruction = dmul
			break
		}
		case OpCodes.idiv: {
			instruction = idiv
			break
		}
		case OpCodes.ldiv: {
			instruction = ldiv
			break
		}
		case OpCodes.fdiv: {
			instruction = fdiv
			break
		}
		case OpCodes.ddiv: {
			instruction = ddiv
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
			instruction = iand
			break
		}
		case OpCodes.land: {
			instruction = land
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
