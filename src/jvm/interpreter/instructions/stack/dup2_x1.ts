import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class dup2_x1 extends Instruction {
	opcode: number = OpCodes.dup2_x1
	length: number = 1

	public override execute(): void {
		const value1 = Runtime.it().pop()
		const value2 = Runtime.it().pop()
		if (value1 instanceof long || value1 instanceof double) {
			Runtime.it().push(value1)
			Runtime.it().push(value2)
			Runtime.it().push(value1)
		} else {
			const value3 = Runtime.it().pop()
			Runtime.it().push(value2)
			Runtime.it().push(value1)
			Runtime.it().push(value3)
			Runtime.it().push(value2)
			Runtime.it().push(value1)
		}
	}

	public override toString(): string {
		return 'dup2_x1'
	}
}
