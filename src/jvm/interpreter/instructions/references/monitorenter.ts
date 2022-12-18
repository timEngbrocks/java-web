import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class monitorenter extends Instruction {
	length = 1
	public override execute(): void {
		Runtime.it().pop()
	}

	public override toString(): string {
		return 'monitorenter'
	}
}
