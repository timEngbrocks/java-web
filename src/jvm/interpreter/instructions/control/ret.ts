import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

export class ret extends Instruction {
	length = 2
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const address = Runtime.getLocalVariable(index)
		Runtime.setPC(address.get().get())
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `ret @ ${index}`
	}
}
