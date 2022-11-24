import { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

class xshl<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = Runtime.pop().get()
		const value1 = Runtime.pop().get()
		const result = this.newConstant()
		const s = value2 | 0x11111
		result.set(value1 << s)
		Runtime.push(result)
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
