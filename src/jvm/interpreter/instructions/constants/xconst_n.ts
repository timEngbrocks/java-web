import { DataType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xconst_n<T extends DataType<number | bigint>> extends Instruction {
	length: number = 1
	private readonly i: number | bigint
	constructor(i: number | bigint, private readonly type: new () => T) {
		super()
		this.i = i
	}

	public override execute(): void {
		const x = this.newConstant()
		x.set(this.i)
		Runtime.it().push(x)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} : const_${this.i}`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const iconst_0 = new xconst_n<int>(0, int)
export const iconst_1 = new xconst_n<int>(1, int)
export const iconst_2 = new xconst_n<int>(2, int)
export const iconst_3 = new xconst_n<int>(3, int)
export const iconst_4 = new xconst_n<int>(4, int)
export const iconst_5 = new xconst_n<int>(5, int)
export const iconst_m1 = new xconst_n<int>(-1, int)

export const lconst_0 = new xconst_n<long>(0, long)
export const lconst_1 = new xconst_n<long>(1, long)

export const fconst_0 = new xconst_n<float>(0, float)
export const fconst_1 = new xconst_n<float>(1, float)
export const fconst_2 = new xconst_n<float>(2, float)

export const dconst_0 = new xconst_n<double>(0, double)
export const dconst_1 = new xconst_n<double>(1, double)
