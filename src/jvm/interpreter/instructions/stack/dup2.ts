import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class dup2 extends Instruction {
	opcode: number = OpCodes.dup2
	length: number = 1

	public override execute(): void {
		const value = Runtime.it().pop()
		if (value instanceof long || value instanceof double) {
			Runtime.it().push(value)
			Runtime.it().push(value)
		} else {
			const value2 = Runtime.it().pop()
			Runtime.it().push(value2)
			Runtime.it().push(value)
			Runtime.it().push(value2)
			Runtime.it().push(value)
		}
	}

	public override toString(): string {
		return 'dup2'
	}
}
