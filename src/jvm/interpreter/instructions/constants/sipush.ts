import { int } from '../../data-types/int'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class sipush extends Instruction {
	opcode: number = OpCodes.sipush
	length: number = 3
	args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		if (this.args.length !== 4) throw `Tried calling sipush with incorrect amount of arguments. Expected 4 but found ${this.args.length}`
		const byte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const byte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const value = new int()
		value.set((byte1 << 8) | byte2)
		Runtime.push(value)
	}

	public override toString(): string {
		return `sipush 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}
}
