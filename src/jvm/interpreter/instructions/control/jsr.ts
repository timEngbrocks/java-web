import { returnAddress } from '../../data-types/returnAddress'
import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class jsr extends Instruction {
	override length = 3
	override args = ''
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
		const pc = ExecutionManager.it().currentPC()
		const address = new returnAddress()
		address.set(pc + 1)
		RuntimeManager.it().push(address)
		ExecutionManager.it().jumpByOffset(branchoffset)
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
		return `jsr @ ${branchoffset}`
	}
}
