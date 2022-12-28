import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class imul extends Instruction {
	length = 1
	public override execute(): void {
		const value2 = Runtime.it().pop()
		const value1 = Runtime.it().pop()
		if (!(value1 instanceof int && value2 instanceof int)) throw new Error('Tried using imul with wrong types')
		const result = new int()
		const resultValue = (value1.get() as number) * (value2.get() as number)
		result.set(resultValue & 0xffffffff)
		Runtime.it().push(result)
	}

	public override toString(): string {
		return 'imul'
	}
}

export class lmul extends Instruction {
	length = 1
	public override execute(): void {
		const value2 = Runtime.it().pop()
		const value1 = Runtime.it().pop()
		if (!(value1 instanceof long && value2 instanceof long)) throw new Error('Tried using lmul with wrong types')
		const result = new long()
		const resultValue = BigInt(value1.get()) * BigInt(value2.get())
		result.set(resultValue & 0xffffffffffffffffn)
		Runtime.it().push(result)
	}

	public override toString(): string {
		return 'lmul'
	}
}

export class fmul extends Instruction {
	length = 1
	public override execute(): void {
		const value2 = Runtime.it().pop()
		const value1 = Runtime.it().pop()
		if (!(value1 instanceof float && value2 instanceof float)) throw new Error('Tried using fmul with wrong types')
		const result = new float()
		if (value1.get() === float.NaN || value2.get() === float.NaN) result.set(float.NaN)
		else if ((value1.get() >= 0 && value2.get() >= 0) || (value1.get() < 0 && value2.get() < 0)) {
			if (((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && value2.get() === 0) ||
			((value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity) && value1.get() === 0)) {
				result.set(float.NaN)
			} else if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() !== float.positiveInfinity && value2.get() !== float.negativeInfinity)) {
				result.set(float.positiveInfinity)
			} else if ((value1.get() !== float.positiveInfinity && value1.get() !== float.negativeInfinity) && (value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity)) {
				result.set(float.positiveInfinity)
			} else {
				result.set((value1.get() as number) * (value2.get() as number))
			}
		} else {
			if (((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && value2.get() === 0) ||
			((value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity) && value1.get() === 0)) {
				result.set(float.NaN)
			} else if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() !== float.positiveInfinity && value2.get() !== float.negativeInfinity)) {
				result.set(float.negativeInfinity)
			} else if ((value1.get() !== float.positiveInfinity && value1.get() !== float.negativeInfinity) && (value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity)) {
				result.set(float.negativeInfinity)
			} else {
				result.set((value1.get() as number) * (value2.get() as number))
			}
		}
		Runtime.it().push(result)
	}

	public override toString(): string {
		return 'fmul'
	}
}

export class dmul extends Instruction {
	length = 1
	public override execute(): void {
		const value2 = Runtime.it().pop()
		const value1 = Runtime.it().pop()
		if (!(value1 instanceof double && value2 instanceof double)) throw new Error('Tried using dmul with wrong types')
		const result = new double()
		if (value1.isNaN() || value2.isNaN()) result.set(double.NaN)
		else if ((value1.get() >= 0 && value2.get() >= 0) || (value1.get() < 0 && value2.get() < 0)) {
			if (((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && value2.get() === 0) ||
			((value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity) && value1.get() === 0)) {
				result.set(double.NaN)
			} else if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() !== double.positiveInfinity && value2.get() !== double.negativeInfinity)) {
				result.set(double.positiveInfinity)
			} else if ((value1.get() !== double.positiveInfinity && value1.get() !== double.negativeInfinity) && (value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity)) {
				result.set(double.positiveInfinity)
			} else {
				result.set((value1.get() as number) * (value2.get() as number))
			}
		} else {
			if (((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && value2.get() === 0) ||
			((value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity) && value1.get() === 0)) {
				result.set(double.NaN)
			} else if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() !== double.positiveInfinity && value2.get() !== double.negativeInfinity)) {
				result.set(double.negativeInfinity)
			} else if ((value1.get() !== double.positiveInfinity && value1.get() !== double.negativeInfinity) && (value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity)) {
				result.set(double.negativeInfinity)
			} else {
				result.set((value1.get() as number) * (value2.get() as number))
			}
		}
		Runtime.it().push(result)
	}

	public override toString(): string {
		return 'dmul'
	}
}
