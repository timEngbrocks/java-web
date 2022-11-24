import { returnAddress } from '../../data-types/returnAddress'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

export class jsr extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const branchoffset = (branchbyte1 << 8) | branchbyte2
		const pc = Runtime.getPC()
		const address = new returnAddress()
		address.set(pc + 1)
		Runtime.push(address)
		Runtime.jumpByOffset(branchoffset)
	}

	public override toString(): string {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const branchoffset = (branchbyte1 << 8) | branchbyte2
		return `jsr @ ${branchoffset}`
	}
}
