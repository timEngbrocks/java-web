import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class goto extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const branchoffset = (branchbyte1 << 8) | branchbyte2
		Runtime.it().jumpByOffset(branchoffset)
	}

	public override toString(): string {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const branchoffset = (branchbyte1 << 8) | branchbyte2
		return `goto @ ${branchoffset}`
	}
}
