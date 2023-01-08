import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export enum IfOps {
	eq = 'eq' as any,
	ne = 'ne' as any,
	lt = 'lt' as any,
	ge = 'ge' as any,
	gt = 'gt' as any,
	le = 'le' as any
}

class ifop extends Instruction {
	override length = 3
	override args: string = ''
	constructor(private readonly op: IfOps) {
		super()
	}

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const value = RuntimeManager.it().pop().get()
		let success = false
		switch (this.op) {
			case IfOps.eq: {
				success = value == 0
				break
			}
			case IfOps.ne: {
				success = value != 0
				break
			}
			case IfOps.lt: {
				success = value < 0
				break
			}
			case IfOps.ge: {
				success = value >= 0
				break
			}
			case IfOps.gt: {
				success = value > 0
				break
			}
			case IfOps.le: {
				success = value <= 0
				break
			}
		}
		if (success) {
			const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
			const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
			const sign = branchbyte1 & (1 << 7)
			const x = (((branchbyte1 & 0xFF) << 8) | (branchbyte2 & 0xFF))
			let branchoffset = (((branchbyte1 & 0xFF) << 8) | (branchbyte2 & 0xFF))
			if (sign) {
				branchoffset = 0xFFFF0000 | x
			}
			ExecutionManager.it().jumpByOffset(branchoffset)
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
		return `if${IfOps[this.op]} @ ${branchoffset}`
	}
}

export const ifeq = new ifop(IfOps.eq)
export const ifne = new ifop(IfOps.ne)
export const iflt = new ifop(IfOps.lt)
export const ifge = new ifop(IfOps.ge)
export const ifgt = new ifop(IfOps.gt)
export const ifle = new ifop(IfOps.le)
