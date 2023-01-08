import { Instruction } from '../Instruction'

export class multianewarray extends Instruction {
	override length = 4
	public override execute(): void {
		throw new Error('TODO: implement multianewarray')
	}

	public override toString(): string {
		return 'multianewarray'
	}
}
