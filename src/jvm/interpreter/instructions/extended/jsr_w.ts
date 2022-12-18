import { Instruction } from '../Instruction'

export class jsr_w extends Instruction {
	length = 5
	public override execute(): void {
		throw new Error('TODO: implement jsr_w')
	}

	public override toString(): string {
		return 'jsr_w'
	}
}
