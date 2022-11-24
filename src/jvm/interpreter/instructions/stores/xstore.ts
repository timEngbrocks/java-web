import { DataType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { reference } from '../../data-types/references'
import { Instruction } from '../../Instruction'
import { LocalVariable } from '../../memory/local-variable'
import { Runtime } from '../../Runtime'

class xstore<T extends DataType<any>> extends Instruction {
	length = 2
	args: string = ''
	constructor(private readonly type: new () => T) {
		super()
	}

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const value = Runtime.pop()
		if (!(value instanceof this.type)) throw 'Tried to store incompatible type using xstore'
		Runtime.setLocalVariable(new LocalVariable(value), index)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `${this.newConstant().toString()} : store @ ${index}}`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const istore = new xstore<int>(int)
export const lstore = new xstore<long>(long)
export const fstore = new xstore<float>(float)
export const dstore = new xstore<double>(double)
export const astore = new xstore<reference>(reference)
