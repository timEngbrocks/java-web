import { Instruction } from '../Instruction'
import { IfOps } from './ifop'
import type { int } from '../../data-types/int'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { ExecutionManager } from '../../manager/ExecutionManager'

class if_icmpop extends Instruction {
	override length = 3
	override args = ''
	constructor(private readonly op: IfOps) {
		super()
	}

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const value2 = (RuntimeManager.it().pop() as int).get()
		const value1 = (RuntimeManager.it().pop() as int).get()
		let success = false
		switch (this.op) {
			case IfOps.eq: {
				success = value1 == value2
				break
			}
			case IfOps.ne: {
				success = value1 != value2
				break
			}
			case IfOps.lt: {
				success = value1 < value2
				break
			}
			case IfOps.ge: {
				success = value1 >= value2
				break
			}
			case IfOps.gt: {
				success = value1 > value2
				break
			}
			case IfOps.le: {
				success = value1 <= value2
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
		return `if_icmp${IfOps[this.op]} @ ${branchoffset}`
	}
}

export const if_icmpeq = new if_icmpop(IfOps.eq)
export const if_icmpne = new if_icmpop(IfOps.ne)
export const if_icmplt = new if_icmpop(IfOps.lt)
export const if_icmpge = new if_icmpop(IfOps.ge)
export const if_icmpgt = new if_icmpop(IfOps.gt)
export const if_icmple = new if_icmpop(IfOps.le)
