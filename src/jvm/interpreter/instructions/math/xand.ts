import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class iand extends Instruction {
	length = 1
	public override execute(): void {
		const value2 = Runtime.it().pop() as int
		const value1 = Runtime.it().pop() as int
		const result = new int()
		result.set((value1.get() as number) & (value2.get() as number))
		Runtime.it().push(result)
	}

	public override toString(): string {
		return 'iand'
	}
}

export class land extends Instruction {
	length = 1
	public override execute(): void {
		const value2 = Runtime.it().pop() as long
		const value1 = Runtime.it().pop() as long
		const result = new long()
		result.set(BigInt(value1.get()) & BigInt(value2.get()))
		Runtime.it().push(result)
	}

	public override toString(): string {
		return 'land'
	}
}
