import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class idiv extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof int && value2 instanceof int)) throw new Error('Tried using idiv with wrong types')
		if (value2.get() === 0) throw new Error('Division by zero in idiv')
		const result = new int()
		const resultValue = (value1.get() as number) / (value2.get() as number)
		result.set(resultValue & 0xffffffff)
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'idiv'
	}
}

export class ldiv extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof long && value2 instanceof long)) throw new Error('Tried using ldiv with wrong types')
		if (value2.get() === 0) throw new Error('Division by zero in ldiv')
		const result = new long()
		const resultValue = BigInt(value1.get()) / BigInt(value2.get())
		result.set(resultValue)
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'ldiv'
	}
}

export class fdiv extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof float && value2 instanceof float)) throw new Error('Tried using fdiv with wrong types')
		if (value2.get() === 0) throw new Error('Division by zero in fdiv')
		const result = new float()
		if (value1.get() === float.NaN || value2.get() === float.NaN) result.set(float.NaN)
		else if ((value1.get() >= 0 && value2.get() >= 0) || (value1.get() < 0 && value2.get() < 0)) {
			if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity)) result.set(float.NaN)
			else if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() !== float.positiveInfinity && value2.get() !== float.negativeInfinity)) result.set(float.positiveInfinity)
			else if ((value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity) && (value1.get() !== float.positiveInfinity && value1.get() !== float.negativeInfinity)) result.set(0)
			else if (value1.get() === 0 && value2.get() === 0) result.set(float.NaN)
			else result.set((value1.get() as number) / (value2.get() as number))
		} else {
			if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity)) result.set(float.NaN)
			else if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() !== float.positiveInfinity && value2.get() !== float.negativeInfinity)) result.set(float.negativeInfinity)
			else if ((value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity) && (value1.get() !== float.positiveInfinity && value1.get() !== float.negativeInfinity)) result.set(0)
			else if (value1.get() === 0 && value2.get() === 0) result.set(float.NaN)
			else result.set((value1.get() as number) / (value2.get() as number))
		}
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'fdiv'
	}
}

export class ddiv extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof double && value2 instanceof double)) throw new Error('Tried using ddiv with wrong types')
		if (value2.get() === 0) throw new Error('Division by zero in ddiv')
		const result = new double()
		if (value1.isNaN() || value2.isNaN()) result.set(double.NaN)
		else if ((value1.get() >= 0 && value2.get() >= 0) || (value1.get() < 0 && value2.get() < 0)) {
			if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity)) result.set(double.NaN)
			else if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() !== double.positiveInfinity && value2.get() !== double.negativeInfinity)) result.set(double.positiveInfinity)
			else if ((value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity) && (value1.get() !== double.positiveInfinity && value1.get() !== double.negativeInfinity)) result.set(0)
			else if (value1.get() === 0 && value2.get() === 0) result.set(double.NaN)
			else result.set((value1.get() as number) / (value2.get() as number))
		} else {
			if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity)) result.set(double.NaN)
			else if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() !== double.positiveInfinity && value2.get() !== double.negativeInfinity)) result.set(double.negativeInfinity)
			else if ((value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity) && (value1.get() !== double.positiveInfinity && value1.get() !== double.negativeInfinity)) result.set(0)
			else if (value1.get() === 0 && value2.get() === 0) result.set(double.NaN)
			else result.set((value1.get() as number) / (value2.get() as number))
		}
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'ddiv'
	}
}
