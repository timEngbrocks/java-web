import { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xshr<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = Runtime.it().pop().get() as number
		const value1 = Runtime.it().pop().get() as number
		const result = this.newConstant()
		if (result instanceof long) {
			result.set(BigInt(BigInt(value1) / BigInt(Math.pow(2, value2 & 0x3f))))
		} else {
			const s = value2 & 0x11111
			result.set(value1 >> s)
		}
		Runtime.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} shr`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const ishr = new xshr<int>(int)
export const lshr = new xshr<long>(long)
