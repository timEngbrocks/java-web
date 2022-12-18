import { Instruction } from '../Instruction'

export class checkcast extends Instruction {
	length = 3
	public override execute(): void {
		throw new Error('TODO: implement checkcast')
	}

	public override toString(): string {
		return 'checkcast'
	}
}
