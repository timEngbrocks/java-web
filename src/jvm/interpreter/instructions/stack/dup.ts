import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class dup extends Instruction {
	opcode: number = OpCodes.dup
	length: number = 1

	public override execute(): void {
		const value = Runtime.it().pop()
		Runtime.it().push(value)
		Runtime.it().push(value)
	}

	public override toString(): string {
		return 'dup'
	}
}
