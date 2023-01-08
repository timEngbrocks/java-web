import type { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

class xshl<T extends DataType<any>> extends Instruction {
	override length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = RuntimeManager.it().pop().get()
		const value1 = RuntimeManager.it().pop().get()
		const result = this.newConstant()
		if (result instanceof long) {
			result.set(BigInt(BigInt(value1) * BigInt(Math.pow(2, value2 & 0b11111))))
		} else {
			const s = value2 & 0b11111
			result.set(value1 << s)
		}
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toPrintableString()}shl`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const ishl = new xshl<int>(int)
export const lshl = new xshl<long>(long)
