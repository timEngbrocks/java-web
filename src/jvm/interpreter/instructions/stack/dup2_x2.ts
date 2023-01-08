import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class dup2_x2 extends Instruction {
	override length: number = 1

	public override execute(): void {
		const value1 = RuntimeManager.it().pop()
		const value2 = RuntimeManager.it().pop()
		if ((value1 instanceof long || value1 instanceof double) && (value2 instanceof long || value2 instanceof double)) {
			RuntimeManager.it().push(value1)
			RuntimeManager.it().push(value2)
			RuntimeManager.it().push(value1)
		} else {
			const value3 = RuntimeManager.it().pop()
			if ((value1 instanceof long || value1 instanceof double) && !(value3 instanceof long || value3 instanceof double)) {
				RuntimeManager.it().push(value1)
				RuntimeManager.it().push(value3)
				RuntimeManager.it().push(value2)
				RuntimeManager.it().push(value1)
			} else if (!(value1 instanceof long || value1 instanceof double) && (value3 instanceof long || value3 instanceof double)) {
				RuntimeManager.it().push(value2)
				RuntimeManager.it().push(value1)
				RuntimeManager.it().push(value3)
				RuntimeManager.it().push(value2)
				RuntimeManager.it().push(value1)
			} else {
				const value4 = RuntimeManager.it().pop()
				RuntimeManager.it().push(value2)
				RuntimeManager.it().push(value1)
				RuntimeManager.it().push(value4)
				RuntimeManager.it().push(value3)
				RuntimeManager.it().push(value2)
				RuntimeManager.it().push(value1)
			}
		}
	}

	public override toString(): string {
		return 'dup2_x2'
	}
}
