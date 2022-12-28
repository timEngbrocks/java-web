import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { d2f, d2i, d2l, f2d, f2i, f2l, i2b, i2c, i2d, i2f, i2l, i2s, l2d, l2f, l2i } from './x2y'

export const getConversionInstructionByCode = (code: string, address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.i2l: {
			instruction = new i2l()
			break
		}
		case OpCodes.i2f: {
			instruction = new i2f()
			break
		}
		case OpCodes.i2d: {
			instruction = new i2d()
			break
		}
		case OpCodes.l2i: {
			instruction = new l2i()
			break
		}
		case OpCodes.l2f: {
			instruction = new l2f()
			break
		}
		case OpCodes.l2d: {
			instruction = new l2d()
			break
		}
		case OpCodes.f2i: {
			instruction = new f2i()
			break
		}
		case OpCodes.f2l: {
			instruction = new f2l()
			break
		}
		case OpCodes.f2d: {
			instruction = new f2d()
			break
		}
		case OpCodes.d2i: {
			instruction = new d2i()
			break
		}
		case OpCodes.d2l: {
			instruction = new d2l()
			break
		}
		case OpCodes.d2f: {
			instruction = new d2f()
			break
		}
		case OpCodes.i2b: {
			instruction = new i2b()
			break
		}
		case OpCodes.i2c: {
			instruction = new i2c()
			break
		}
		case OpCodes.i2s: {
			instruction = new i2s()
			break
		}
	}
	return instruction
}
