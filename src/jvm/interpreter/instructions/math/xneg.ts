import { DataType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

class xneg<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value = Runtime.pop().get()
		const result = this.newConstant()
		result.set(-value)
		Runtime.push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} neg`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const ineg = new xneg<int>(int)
export const lneg = new xneg<long>(long)
export const fneg = new xneg<float>(float)
export const dneg = new xneg<double>(double)
