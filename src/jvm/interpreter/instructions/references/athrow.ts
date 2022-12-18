import { Instruction } from '../Instruction'

export class athrow extends Instruction {
	length = 1
	public override execute(): void {
		throw new Error('TODO: implement athrow')
	}

	public override toString(): string {
		return 'athrow'
	}
}
