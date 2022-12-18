import { ReferenceType } from '../../data-types/data-type'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { IfOps } from './ifop'

class if_acmpop extends Instruction {
	length = 3
	args = ''
	constructor(private readonly op: IfOps) {
		super()
	}

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const value2 = (Runtime.it().pop() as ReferenceType).get()?.get()
		const value1 = (Runtime.it().pop() as ReferenceType).get()?.get()
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
			const offset = (branchbyte1 << 8) | branchbyte2
			Runtime.it().jumpByOffset(offset)
		}
	}

	public override toString(): string {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const offset = (branchbyte1 << 8) | branchbyte2
		return `if_acmp${IfOps[this.op]} @ ${offset}`
	}
}

export const if_acmpeq = new if_acmpop(IfOps.eq)
export const if_acmpne = new if_acmpop(IfOps.ne)
