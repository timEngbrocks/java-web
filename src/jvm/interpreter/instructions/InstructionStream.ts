import { Instruction } from './Instruction'
import { InstructionResolver } from './InstructionResolver'

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
			const instruction = InstructionResolver.getInstructionByCode(code.substring(cursor), cursor)
			instructions.push(instruction)
			for (let i = 0; i < instruction.length - 1; i++) instructions.push(new Instruction())
			cursor += instruction.length * 2
		}

		return instructions
	}
}
