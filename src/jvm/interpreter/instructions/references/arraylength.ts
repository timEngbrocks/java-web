import type { ArrayType } from '../../data-types/ArrayType'
import { int } from '../../data-types/int'
import type { ReferenceType } from '../../data-types/ReferenceType'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class arraylength extends Instruction {
	override length = 1
	public override execute(): void {
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		RuntimeManager.it().push(new int(array.get().length))
	}

	public override toString(): string {
		return 'arraylength'
	}
}
