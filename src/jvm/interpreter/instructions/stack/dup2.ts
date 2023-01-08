import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class dup2 extends Instruction {
	override length: number = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		if (value instanceof long || value instanceof double) {
			RuntimeManager.it().push(value)
			RuntimeManager.it().push(value)
		} else {
			const value2 = RuntimeManager.it().pop()
			RuntimeManager.it().push(value2)
			RuntimeManager.it().push(value)
			RuntimeManager.it().push(value2)
			RuntimeManager.it().push(value)
		}
	}

	public override toString(): string {
		return 'dup2'
	}
}
