import type { ReferenceType } from '../../data-types/ReferenceType'
import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'
import { IfOps } from './ifop'

class if_acmpop extends Instruction {
	override length = 3
	override args = ''
	constructor(private readonly op: IfOps) {
		super()
	}

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const reference2 = RuntimeManager.it().pop() as ReferenceType
		const reference1 = RuntimeManager.it().pop() as ReferenceType
		const value2 = reference2.get().address?.get()
		const value1 = reference1.get().address?.get()
		let success = false
		switch (this.op) {
			case IfOps.eq: {
				success = value1 === value2
				break
			}
			case IfOps.ne: {
				success = value1 !== value2
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
		return `if_acmp${IfOps[this.op]} @ ${branchoffset}`
	}
}

export const if_acmpeq = new if_acmpop(IfOps.eq)
export const if_acmpne = new if_acmpop(IfOps.ne)
