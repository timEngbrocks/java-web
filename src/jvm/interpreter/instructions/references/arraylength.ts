import { ArrayType, ReferenceType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { Runtime } from '../../Runtime'
import { Instruction } from '../Instruction'

export class arraylength extends Instruction {
	length = 1
	public override execute(): void {
		const arrayRef = Runtime.it().pop() as ReferenceType
		const array = Runtime.it().load(arrayRef.get()!) as ArrayType
		Runtime.it().push(new int(array.get().length))
	}

	public override toString(): string {
		return 'arraylength'
	}
}
