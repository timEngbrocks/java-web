import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

export class dup2_x2 extends Instruction {
	opcode: number = OpCodes.dup2_x2
	length: number = 1

	public override execute(): void {
		const value1 = Runtime.pop()
		const value2 = Runtime.pop()
		if ((value1 instanceof long || value1 instanceof double) && (value2 instanceof long || value2 instanceof double)) {
			Runtime.push(value1)
			Runtime.push(value2)
			Runtime.push(value1)
		} else {
			const value3 = Runtime.pop()
			if ((value1 instanceof long || value1 instanceof double) && !(value3 instanceof long || value3 instanceof double)) {
				Runtime.push(value1)
				Runtime.push(value3)
				Runtime.push(value2)
				Runtime.push(value1)
			} else if (!(value1 instanceof long || value1 instanceof double) && (value3 instanceof long || value3 instanceof double)) {
				Runtime.push(value2)
				Runtime.push(value1)
				Runtime.push(value3)
				Runtime.push(value2)
				Runtime.push(value1)
			} else {
				const value4 = Runtime.pop()
				Runtime.push(value2)
				Runtime.push(value1)
				Runtime.push(value4)
				Runtime.push(value3)
				Runtime.push(value2)
				Runtime.push(value1)
			}
		}
	}

	public override toString(): string {
		return 'dup2_x2'
	}
}
