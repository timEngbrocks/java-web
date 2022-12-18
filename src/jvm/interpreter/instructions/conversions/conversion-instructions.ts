import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'
import { d2f, d2i, d2l, f2d, f2i, f2l, i2b, i2c, i2d, i2f, i2l, i2s, l2d, l2f, l2i } from './x2y'

export const getConversionInstructionByCode = (code: string, address: number): Instruction => {
	const opcode = Number.parseInt(code.substring(0, 2), 16)
	let instruction = new Instruction()
	switch (opcode) {
		case OpCodes.i2l: {
			instruction = i2l
			break
		}
		case OpCodes.i2f: {
			instruction = i2f
			break
		}
		case OpCodes.i2d: {
			instruction = i2d
			break
		}
		case OpCodes.l2i: {
			instruction = l2i
			break
		}
		case OpCodes.l2f: {
			instruction = l2f
			break
		}
		case OpCodes.l2d: {
			instruction = l2d
			break
		}
		case OpCodes.f2i: {
			instruction = f2i
			break
		}
		case OpCodes.f2l: {
			instruction = f2l
			break
		}
		case OpCodes.f2d: {
			instruction = f2d
			break
		}
		case OpCodes.d2i: {
			instruction = d2i
			break
		}
		case OpCodes.d2l: {
			instruction = d2l
			break
		}
		case OpCodes.d2f: {
			instruction = d2f
			break
		}
		case OpCodes.i2b: {
			instruction = i2b
			break
		}
		case OpCodes.i2c: {
			instruction = i2c
			break
		}
		case OpCodes.i2s: {
			instruction = i2s
			break
		}
	}
	return instruction
}
