import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class pop extends Instruction {
	opcode: number = OpCodes.pop
	length: number = 1

	public override execute(): void {
		Runtime.it().pop()
	}

	public override toString(): string {
		return 'pop'
	}
}
