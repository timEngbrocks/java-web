import { Instruction } from '../Instruction'

export class Instanceof extends Instruction {
	length = 3
	public override execute(): void {
		throw new Error('TODO: implement instanceof')
	}

	public override toString(): string {
		return 'Instanceof'
	}
}
