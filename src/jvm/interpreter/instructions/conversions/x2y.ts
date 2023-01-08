import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class i2l extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const result = new long(BigInt(value.get()))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'i2l'
	}
}

export class i2f extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const result = new float(value.get())
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'i2f'
	}
}

export class i2d extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const result = new double(value.get())
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'i2d'
	}
}

export class i2b extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const result = new int(((value.get() as number) & 0xff) | (((value.get() as number) & (1 << 63))))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'i2b'
	}
}

export class i2c extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const result = new int(((value.get() as number) & 0xffff))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'i2c'
	}
}

export class i2s extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const result = new int(((value.get() as number) & 0xffff) | (((value.get() as number) & (1 << 63))))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'i2s'
	}
}

export class l2d extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as long
		const result = new double(Number(value.get()))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'l2d'
	}
}

export class l2f extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as long
		const result = new float(Number(value.get()))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'l2f'
	}
}

export class l2i extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as long
		const result = new int(Number(value.get()) & 0xffffffff)
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'l2i'
	}
}

export class f2d extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as float
		const result = new double(value.get())
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'f2d'
	}
}

export class f2l extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as float
		const result = new long()
		if (value.get() === float.NaN) result.set(0n)
		else if (value.get() === float.positiveInfinity) result.set(long.MAX)
		else if (value.get() === float.negativeInfinity) result.set(long.MIN)
		else result.set(BigInt(Math.floor(value.get() as number)))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'f2l'
	}
}

export class f2i extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as float
		const result = new int()
		if (value.get() === float.NaN) result.set(0)
		else if (value.get() === float.positiveInfinity) result.set(int.MAX)
		else if (value.get() === float.negativeInfinity) result.set(int.MIN)
		else result.set(Math.floor(value.get() as number))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'f2i'
	}
}

export class d2f extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as double
		const result = new float(value.get())
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'd2f'
	}
}

export class d2i extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as double
		const result = new int()
		if (value.get() === double.NaN) result.set(0)
		else if (value.get() === double.positiveInfinity) result.set(int.MAX)
		else if (value.get() === double.negativeInfinity) result.set(int.MIN)
		else result.set(Math.floor(value.get() as number))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'd2i'
	}
}

export class d2l extends Instruction {
	override length = 1
	public override execute(): void {
		const value = RuntimeManager.it().pop() as double
		const result = new long()
		if (value.get() === double.NaN) result.set(0n)
		else if (value.get() === double.positiveInfinity) result.set(long.MAX)
		else if (value.get() === double.negativeInfinity) result.set(long.MIN)
		else result.set(BigInt(Math.floor(value.get() as number)))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return 'd2l'
	}
}
