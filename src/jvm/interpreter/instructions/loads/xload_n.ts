import { DataType, Reference, ReferenceType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class xload_n<T extends DataType<number | bigint | Reference>> extends Instruction {
	length = 1
	private readonly i: number
	constructor(i: number, private readonly type: new () => T) {
		super()
		this.i = i
	}

	public override execute(): void {
		const localVariable = Runtime.it().getLocal(this.i)
		Runtime.it().push(localVariable)
	}

	public override toString(): string {
		return `${this.getPrintableType()}load_${this.i}`
	}

	private newConstant(): T {
		return new this.type()
	}

	private getPrintableType(): string {
		const constant = this.newConstant()
		if (constant instanceof int) return 'i'
		if (constant instanceof long) return 'l'
		if (constant instanceof float) return 'f'
		if (constant instanceof double) return 'd'
		return 'a'
	}
}

export const iload_0 = new xload_n<int>(0, int)
export const iload_1 = new xload_n<int>(1, int)
export const iload_2 = new xload_n<int>(2, int)
export const iload_3 = new xload_n<int>(3, int)

export const lload_0 = new xload_n<long>(0, long)
export const lload_1 = new xload_n<long>(1, long)
export const lload_2 = new xload_n<long>(2, long)
export const lload_3 = new xload_n<long>(3, long)

export const fload_0 = new xload_n<float>(0, float)
export const fload_1 = new xload_n<float>(1, float)
export const fload_2 = new xload_n<float>(2, float)
export const fload_3 = new xload_n<float>(3, float)

export const dload_0 = new xload_n<double>(0, double)
export const dload_1 = new xload_n<double>(1, double)
export const dload_2 = new xload_n<double>(2, double)
export const dload_3 = new xload_n<double>(3, double)

export const aload_0 = new xload_n<ReferenceType>(0, ReferenceType)
export const aload_1 = new xload_n<ReferenceType>(1, ReferenceType)
export const aload_2 = new xload_n<ReferenceType>(2, ReferenceType)
export const aload_3 = new xload_n<ReferenceType>(3, ReferenceType)
