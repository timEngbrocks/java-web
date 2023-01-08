import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class dup extends Instruction {
	override length: number = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().push(value)
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		return 'dup'
	}
}
