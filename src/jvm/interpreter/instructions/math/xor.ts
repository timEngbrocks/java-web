import type { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

class xor<T extends DataType<any>> extends Instruction {
	override length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = RuntimeManager.it().pop().get()
		const value1 = RuntimeManager.it().pop().get()
		const result = this.newConstant()
		if (this.newConstant() instanceof long) result.set((value1 as bigint) | (value2 as bigint))
		else result.set(value1 | value2)
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toPrintableString()}or`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const ior = new xor<int>(int)
export const lor = new xor<long>(long)
