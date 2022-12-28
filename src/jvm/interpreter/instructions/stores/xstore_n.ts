import { DataType, Reference, ReferenceType, ReturnAddressType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xstore_n<T extends DataType<number | bigint | Reference>> extends Instruction {
	length = 1
	private readonly i: number
	constructor(i: number, private readonly type: new () => T) {
		super()
		this.i = i
	}

	public override execute(): void {
		const value = Runtime.it().pop()
		if (this.newConstant() instanceof ReferenceType) {
			if (!(value instanceof this.type || value instanceof ReturnAddressType)) throw new Error('Tried to store incompatible type using xstore_n')
		} else if (!(value instanceof this.type)) throw new Error('Tried to store incompatible type using xstore_n')
		Runtime.it().setLocal(value, this.i)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} : store_${this.i}`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const istore_0 = new xstore_n<int>(0, int)
export const istore_1 = new xstore_n<int>(1, int)
export const istore_2 = new xstore_n<int>(2, int)
export const istore_3 = new xstore_n<int>(3, int)

export const lstore_0 = new xstore_n<long>(0, long)
export const lstore_1 = new xstore_n<long>(1, long)
export const lstore_2 = new xstore_n<long>(2, long)
export const lstore_3 = new xstore_n<long>(3, long)

export const fstore_0 = new xstore_n<float>(0, float)
export const fstore_1 = new xstore_n<float>(1, float)
export const fstore_2 = new xstore_n<float>(2, float)
export const fstore_3 = new xstore_n<float>(3, float)

export const dstore_0 = new xstore_n<double>(0, double)
export const dstore_1 = new xstore_n<double>(1, double)
export const dstore_2 = new xstore_n<double>(2, double)
export const dstore_3 = new xstore_n<double>(3, double)

export const astore_0 = new xstore_n<ReferenceType>(0, ReferenceType)
export const astore_1 = new xstore_n<ReferenceType>(1, ReferenceType)
export const astore_2 = new xstore_n<ReferenceType>(2, ReferenceType)
export const astore_3 = new xstore_n<ReferenceType>(3, ReferenceType)
