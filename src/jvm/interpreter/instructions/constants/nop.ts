import { Instruction } from '../Instruction'

export class nop extends Instruction {
	override length: number = 1
	public override execute(): void {}
	public override toString(): string {
		return 'nop'
	}
}
