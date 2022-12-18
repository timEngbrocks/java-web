import { Instruction } from '../Instruction'

export class goto_w extends Instruction {
	length = 5
	public override execute(): void {
		throw new Error('TODO: implement goto_w')
	}

	public override toString(): string {
		return 'goto_w'
	}
}
