import { reference } from '../../data-types/references'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

export class aconst_null extends Instruction {
	length: number = 1
	public override execute(): void {
		const a = new reference()
		a.set(null)
		Runtime.push(a)
	}

	public override toString(): string {
		return 'aconst_null'
	}
}
