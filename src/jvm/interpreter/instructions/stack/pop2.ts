import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class pop2 extends Instruction {
	opcode: number = OpCodes.pop2
	length: number = 1

	public override execute(): void {
		const value = Runtime.it().pop()
		if (value instanceof long || value instanceof double) return
		Runtime.it().pop()
	}

	public override toString(): string {
		return 'pop2'
	}
}
