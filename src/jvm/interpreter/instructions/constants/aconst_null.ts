import { ReferenceType } from '../../data-types/ReferenceType'
import { Instruction } from '../Instruction'
import { RuntimeManager } from '../../manager/RuntimeManager'

export class aconst_null extends Instruction {
	override length: number = 1
	public override execute(): void {
		RuntimeManager.it().push(new ReferenceType({ address: null, name: 'aconst_null' }))
	}

	public override toString(): string {
		return 'aconst_null'
	}
}
