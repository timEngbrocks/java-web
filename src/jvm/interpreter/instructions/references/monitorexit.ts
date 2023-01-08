import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class monitorexit extends Instruction {
	override length = 1
	public override execute(): void {
		RuntimeManager.it().pop()
	}

	public override toString(): string {
		return 'monitorexit'
	}
}
