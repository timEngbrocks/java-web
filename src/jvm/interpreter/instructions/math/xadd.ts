import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class iadd extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof int && value2 instanceof int)) throw new Error('Tried using iadd with wrong types')
		const result = new int()
		const resultValue = (value1.get() as number) + (value2.get() as number)
		result.set(resultValue & 0xffffffff)
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'iadd'
	}
}

export class ladd extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof long && value2 instanceof long)) throw new Error('Tried using ladd with wrong types')
		const result = new long()
		const resultValue = BigInt(value1.get()) + BigInt(value2.get())
		result.set(resultValue & 0xffffffffffffffffn)
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'ladd'
	}
}

export class fadd extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof float && value2 instanceof float)) throw new Error('Tried using fadd with wrong types')
		const result = new float()
		if (value1.get() === float.NaN || value2.get() === float.NaN) result.set(float.NaN)
		else if (value1.get() === float.positiveInfinity && value2.get() === float.negativeInfinity) result.set(float.NaN)
		else if (value1.get() === float.negativeInfinity && value2.get() === float.positiveInfinity) result.set(float.NaN)
		else if (value1.get() === float.positiveInfinity && value2.get() === float.positiveInfinity) result.set(float.positiveInfinity)
		else if (value1.get() === float.negativeInfinity && value2.get() === float.negativeInfinity) result.set(float.negativeInfinity)
		else if ((value1.get() === float.positiveInfinity || value1.get() === float.negativeInfinity) && (value2.get() !== float.positiveInfinity || value2.get() !== float.negativeInfinity)) result.set(value1.get() as number)
		else if ((value2.get() === float.positiveInfinity || value2.get() === float.negativeInfinity) && (value1.get() !== float.positiveInfinity || value1.get() !== float.negativeInfinity)) result.set(value2.get() as number)
		else result.set((value1.get() as number) + (value2.get() as number))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'fadd'
	}
}

export class dadd extends Instruction {
	override length = 1
	public override execute(): void {
		const value2 = RuntimeManager.it().pop()
		const value1 = RuntimeManager.it().pop()
		if (!(value1 instanceof double && value2 instanceof double)) throw new Error('Tried using dadd with wrong types')
		const result = new double()
		if (value1.isNaN() || value2.isNaN()) result.set(double.NaN)
		else if (value1.get() === double.positiveInfinity && value2.get() === double.negativeInfinity) result.set(double.NaN)
		else if (value1.get() === double.negativeInfinity && value2.get() === double.positiveInfinity) result.set(double.NaN)
		else if (value1.get() === double.positiveInfinity && value2.get() === double.positiveInfinity) result.set(double.positiveInfinity)
		else if (value1.get() === double.negativeInfinity && value2.get() === double.negativeInfinity) result.set(double.negativeInfinity)
		else if ((value1.get() === double.positiveInfinity || value1.get() === double.negativeInfinity) && (value2.get() !== double.positiveInfinity || value2.get() !== double.negativeInfinity)) result.set(value1.get() as number)
		else if ((value2.get() === double.positiveInfinity || value2.get() === double.negativeInfinity) && (value1.get() !== double.positiveInfinity || value1.get() !== double.negativeInfinity)) result.set(value2.get() as number)
		else result.set((value1.get() as number) + (value2.get() as number))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'dadd'
	}
}
