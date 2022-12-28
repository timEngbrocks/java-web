import { cloneDeep } from 'lodash'
import { getComparisonInstructionByCode } from './comparisons/comparison-instructions'
import { getConstantInstructionByCode } from './constants/constant-instructions'
import { getControlInstructionByCode } from './control/control-instructions'
import { getConversionInstructionByCode } from './conversions/conversion-instructions'
import { getExtendedInstructionByCode } from './extended/extended-instructions'
import { Instruction } from './Instruction'
import { getLoadInstructionByCode } from './loads/load-instructions'
import { getMathInstructionByCode } from './math/math-instructions'
import { getReferenceInstructionByCode } from './references/reference-instructions'
import { getReservedInstructionByCode } from './reserved/reserved-instructions'
import { getStackInstructionByCode } from './stack/stack-instructions'
import { getStoreInstructionByCode } from './stores/store-instructions'

const instructionTypes = [
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
const getInstructionByCode = (code: string, address: number): Instruction => {
	for (const instructionType of instructionTypes) {
		const instruction = cloneDeep(instructionType(code, address))
		if (!isNaN(instruction.length)) return instruction
	}
	throw new Error(`Error decoding instruction stream. Got opcode: 0x${code.substring(0, 2)}`)
}

export class InstructionStream {
	public static create(name: string, stream: Instruction[]): InstructionStream {
		const instrutionStream = new InstructionStream(name)
		instrutionStream.stream = stream
		return instrutionStream
	}

	private readonly name: string = ''
	private pc: number = 0
	private previousPC: number = 0
	private stream: Instruction[]

	constructor(name: string, code: string = '') {
		this.name = name
		if (code === '') this.stream = []
		else this.stream = this.parseCode(code)
	}

	public getName(): string {
		return this.name
	}

	public next(): Instruction {
		const instruction = this.stream[this.pc]
		this.previousPC = this.pc
		this.pc += instruction.length
		return instruction
	}

	public hasNext(): boolean {
		return this.pc < this.stream.length
	}

	public getPC(): number {
		return this.pc
	}

	public setPC(pc: number): void {
		this.previousPC = this.pc
		this.pc = pc
	}

	public setOffset(offset: number): void {
		this.pc = offset + this.previousPC
	}

	public toString(): string {
		return this.stream.reduce((acc, val, idx) => acc + `[${idx}]: ` + val.toString() + '\n', '')
	}

	private parseCode(code: string): Instruction[] {
		const instructions: Instruction[] = []

		let cursor = 0
		while (cursor < code.length) {
			const instruction = getInstructionByCode(code.substring(cursor), cursor)
			instructions.push(instruction)
			for (let i = 0; i < instruction.length - 1; i++) instructions.push(new Instruction())
			cursor += instruction.length * 2
		}

		return instructions
	}
}
