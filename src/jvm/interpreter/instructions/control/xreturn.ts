import { Block } from '../../data-types/block'
import { DataType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { reference } from '../../data-types/references'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

class xreturn<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	// FIXME: synchronized method return
	public override execute(): void {
		if (this.newConstant() instanceof Block) return
		const value = Runtime.pop()
		const returnValue = this.newConstant()
		returnValue.set(value.get())
		Runtime.setReturnValue(returnValue)
		Runtime.returnFromFunction()
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
export const areturn = new xreturn<reference>(reference)
export const Return = new xreturn<Block>(Block)
