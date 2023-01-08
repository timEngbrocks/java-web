import { Instruction } from '../Instruction'

export class breakpoint extends Instruction {
	override length = 1
	public override execute(): void {

	}

	public override toString(): string {
		return 'breakpoint'
	}
}
