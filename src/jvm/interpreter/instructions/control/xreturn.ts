import { Block } from '../../data-types/block'
import { DataType, ReferenceType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xreturn<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	// FIXME: synchronized method return
	public override execute(): void {
		if (this.newConstant() instanceof Block) {
			Runtime.it().returnFromFunction()
			return
		}
		if (this.newConstant() instanceof int) {
			const value = Runtime.it().pop()
			const returnValue = new int(value.get())
			Runtime.it().setReturnValue(returnValue)
			Runtime.it().returnFromFunction()
		} else {
			const value = Runtime.it().pop()
			Runtime.it().setReturnValue(value)
			Runtime.it().returnFromFunction()
		}
	}

	public override toString(): string {
		if (this.newConstant() instanceof Block) return 'return'
		return `${this.newConstant().toString()} return`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const ireturn = new xreturn<int>(int)
export const lreturn = new xreturn<long>(long)
export const freturn = new xreturn<float>(float)
export const dreturn = new xreturn<double>(double)
export const areturn = new xreturn<ReferenceType>(ReferenceType)
export const Return = new xreturn<Block>(Block)
