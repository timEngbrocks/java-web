import type { ArrayType } from '../../data-types/ArrayType'
import type { byte } from '../../data-types/byte'
import type { char } from '../../data-types/char'
import type { double } from '../../data-types/double'
import type { float } from '../../data-types/float'
import type { int } from '../../data-types/int'
import type { long } from '../../data-types/long'
import type { ReferenceType } from '../../data-types/ReferenceType'
import type { short } from '../../data-types/short'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class iastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as int
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'iastore'
	}
}

export class lastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as long
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'lastore'
	}
}

export class fastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as float
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'fastore'
	}
}

export class dastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as double
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'dastore'
	}
}

export class aastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as ReferenceType
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = value
		array.set(values)
	}

	public override toString(): string {
		return 'aastore'
	}
}

export class bastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as byte
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'bastore'
	}
}

export class castore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as char
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'castore'
	}
}

export class sastore extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop() as short
		const index = RuntimeManager.it().pop() as int
		const arrayRef = (RuntimeManager.it().pop() as ReferenceType)
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const values = array.get()
		values[index.get() as number] = RuntimeManager.it().allocate(value)
		array.set(values)
	}

	public override toString(): string {
		return 'sastore'
	}
}
