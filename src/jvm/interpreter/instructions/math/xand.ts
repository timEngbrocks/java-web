import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class iand extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop() as int
		const value1 = RuntimeManager.it().pop() as int
		const result = new int()
		result.set((value1.get() as number) & (value2.get() as number))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'iand'
	}
}

export class land extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop() as long
		const value1 = RuntimeManager.it().pop() as long
		const result = new long()
		result.set(BigInt(value1.get()) & BigInt(value2.get()))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'land'
	}
}
