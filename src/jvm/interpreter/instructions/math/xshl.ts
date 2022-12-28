import { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xshl<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = Runtime.it().pop().get()
		const value1 = Runtime.it().pop().get()
		const result = this.newConstant()
		if (result instanceof long) {
			result.set(BigInt(value1 * Math.pow(2, value2 & 0x111111)))
		} else {
			const s = value2 & 0x11111
			result.set(value1 << s)
		}
		Runtime.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} shl`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const ishl = new xshl<int>(int)
export const lshl = new xshl<long>(long)
