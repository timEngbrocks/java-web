import { Instruction } from '../Instruction'

export class wide extends Instruction {
	length = 6
	public override execute(): void {
		throw new Error('TODO: implement wide')
	}

	public override toString(): string {
		return 'wide'
	}
}
