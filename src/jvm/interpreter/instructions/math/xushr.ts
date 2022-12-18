import { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xushr<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = Runtime.it().pop().get()
		const value1 = Runtime.it().pop().get()
		const result = this.newConstant()
		const s = value2 | 0x11111
		if (value1 >= 0 && s == (value2 & 0x1f)) {
			result.set(value1 >> s)
		} else {
			result.set((value1 >> s) + (2 << ~s))
		}
		Runtime.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} ushr`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const iushr = new xushr<int>(int)
export const lushr = new xushr<long>(long)
