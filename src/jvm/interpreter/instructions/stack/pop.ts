import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class pop extends Instruction {
	override length: number = 1

	public override execute(): void {
		RuntimeManager.it().pop()
	}

	public override toString(): string {
		return 'pop'
	}
}
