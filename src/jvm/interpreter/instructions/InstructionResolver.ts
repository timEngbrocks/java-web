import { cloneDeep } from 'lodash'
import { getComparisonInstructionByCode } from './comparisons/comparison-instructions'
import { getConstantInstructionByCode } from './constants/constant-instructions'
import { getControlInstructionByCode } from './control/control-instructions'
import { getConversionInstructionByCode } from './conversions/conversion-instructions'
import { getExtendedInstructionByCode } from './extended/extended-instructions'
import type { Instruction } from './Instruction'
import { getLoadInstructionByCode } from './loads/load-instructions'
import { getMathInstructionByCode } from './math/math-instructions'
import { getReferenceInstructionByCode } from './references/reference-instructions'
import { getReservedInstructionByCode } from './reserved/reserved-instructions'
import { getStackInstructionByCode } from './stack/stack-instructions'
import { getStoreInstructionByCode } from './stores/store-instructions'

export class InstructionResolver {
	private static readonly instructionTypes = [
		getConstantInstructionByCode,
		getLoadInstructionByCode,
		getStoreInstructionByCode,
		getStackInstructionByCode,
		getMathInstructionByCode,
		getConversionInstructionByCode,
		getComparisonInstructionByCode,
		getReferenceInstructionByCode,
		getControlInstructionByCode,
		getExtendedInstructionByCode,
		getReservedInstructionByCode
	]

	public static getInstructionByCode(code: string, address: number): Instruction {
		for (const instructionType of InstructionResolver.instructionTypes) {
			const instruction = cloneDeep(instructionType(code, address))
			if (!isNaN(instruction.length)) return instruction
		}
		throw new Error(`Error decoding instruction stream. Got opcode: 0x${code.substring(0, 2)}`)
	}
}
