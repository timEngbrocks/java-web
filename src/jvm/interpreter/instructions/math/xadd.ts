import { DataType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xadd<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = Runtime.it().pop()
		const value1 = Runtime.it().pop()
		if (!(value1 instanceof this.type && value2 instanceof this.type)) throw new Error(`Tried using xadd with wrong types ${value1.toString()} ${value2.toString()} ${this.newConstant().toString()}`)
		const result = this.newConstant()
		if (this.newConstant() instanceof long) result.set(BigInt(value1.get()) + BigInt(value2.get()))
		else result.set(value1.get() + value2.get())
		Runtime.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} : add`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const iadd = new xadd<int>(int)
export const ladd = new xadd<long>(long)
export const fadd = new xadd<float>(float)
export const dadd = new xadd<double>(double)
