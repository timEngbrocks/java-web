import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class iinc extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const constant = Number.parseInt(this.args.substring(2, 4), 16)
		const localVariable = Runtime.it().getLocal(index)
		localVariable.set(localVariable.get() + constant)
		Runtime.it().setLocal(localVariable, index)
	}

	public override toString(): string {
		return `iinc 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}
}
