import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class monitorenter extends Instruction {
	override length = 1
	public override execute(): void {
		RuntimeManager.it().pop()
	}

	public override toString(): string {
		return 'monitorenter'
	}
}
