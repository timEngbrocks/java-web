import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class swap extends Instruction {
	override length: number = 1

	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		RuntimeManager.it().push(value2)
		RuntimeManager.it().push(value1)
	}

	public override toString(): string {
		return 'swap'
	}
}
