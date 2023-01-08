import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { RuntimeManager } from '../../manager/RuntimeManager'

export class pop2 extends Instruction {
	override length: number = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		if (value instanceof long || value instanceof double) return
		RuntimeManager.it().pop()
	}

	public override toString(): string {
		return 'pop2'
	}
}
