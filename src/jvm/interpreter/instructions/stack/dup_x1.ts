import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class dup_x1 extends Instruction {
	opcode: number = OpCodes.dup_x1
	length: number = 1

	public override execute(): void {
		const value1 = Runtime.it().pop()
		const value2 = Runtime.it().pop()
		Runtime.it().push(value1)
		Runtime.it().push(value2)
		Runtime.it().push(value1)
	}

	public override toString(): string {
		return 'dup_x1'
	}
}
