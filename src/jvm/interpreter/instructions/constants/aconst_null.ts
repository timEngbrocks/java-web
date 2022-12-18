import { ReferenceType } from '../../data-types/data-type'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class aconst_null extends Instruction {
	length: number = 1
	public override execute(): void {
		Runtime.it().push(new ReferenceType(null))
	}

	public override toString(): string {
		return 'aconst_null'
	}
}
