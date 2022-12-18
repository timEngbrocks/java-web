import { byte } from '../../data-types/byte'
import { char } from '../../data-types/char'
import { DataType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { short } from '../../data-types/short'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

class x2y<T extends DataType<any>, U extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly typeFrom: new () => T, private readonly typeTo: new () => U) {
		super()
	}

	public override execute(): void {
		const value = Runtime.it().pop()
		const result = this.newConstantTo()
		result.set(value.get())
		Runtime.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstantFrom().toString()} 2 ${this.newConstantTo().toString()}`
	}

	private newConstantFrom(): T {
		return new this.typeFrom()
	}

	private newConstantTo(): U {
		return new this.typeTo()
	}
}

export const i2l = new x2y<int, long>(int, long)
export const i2f = new x2y<int, float>(int, float)
export const i2d = new x2y<int, double>(int, double)

export const l2i = new x2y<long, int>(long, int)
export const l2f = new x2y<long, float>(long, float)
export const l2d = new x2y<long, double>(long, double)

export const f2i = new x2y<float, int>(float, int)
export const f2l = new x2y<float, long>(float, long)
export const f2d = new x2y<float, double>(float, double)

export const d2i = new x2y<double, int>(double, int)
export const d2l = new x2y<double, long>(double, long)
export const d2f = new x2y<double, float>(double, float)

export const i2b = new x2y<int, byte>(int, byte)
export const i2c = new x2y<int, char>(int, char)
export const i2s = new x2y<int, short>(int, short)
