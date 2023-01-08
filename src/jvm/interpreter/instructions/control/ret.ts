import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class ret extends Instruction {
	override length = 2
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const address = RuntimeManager.it().getLocal(index)
		ExecutionManager.it().setPC(address.get())
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `ret @ ${index}`
	}
}
