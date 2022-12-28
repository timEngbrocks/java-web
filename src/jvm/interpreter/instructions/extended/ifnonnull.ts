import { ReferenceType } from '../../data-types/data-type'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class ifnonnull extends Instruction {
	length = 3
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const sign = branchbyte1 & (1 << 7)
		const x = (((branchbyte1 & 0xFF) << 8) | (branchbyte2 & 0xFF))
		let branchoffset = (((branchbyte1 & 0xFF) << 8) | (branchbyte2 & 0xFF))
		if (sign) {
			branchoffset = 0xFFFF0000 | x
		}
		const value = Runtime.it().pop()
		if (!(value instanceof ReferenceType)) throw new Error('Tried ifnonnull without reference')
		if (value.get().address) {
			Runtime.it().jumpByOffset(branchoffset)
		}
	}

	public override toString(): string {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const sign = branchbyte1 & (1 << 7)
		const x = (((branchbyte1 & 0xFF) << 8) | (branchbyte2 & 0xFF))
		let branchoffset = (((branchbyte1 & 0xFF) << 8) | (branchbyte2 & 0xFF))
		if (sign) {
			branchoffset = 0xFFFF0000 | x
		}
		return `ifnonnull @ ${branchoffset}`
	}
}
