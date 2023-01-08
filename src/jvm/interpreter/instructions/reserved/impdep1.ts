import { Instruction } from '../Instruction'

export class impdep1 extends Instruction {
	override length = 1
	public override execute(): void {

	}

	public override toString(): string {
		return 'impdep1'
	}
}
