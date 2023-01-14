import { ArrayType } from '../../data-types/ArrayType'
import type { byte } from '../../data-types/byte'
import type { char } from '../../data-types/char'
import type { double } from '../../data-types/double'
import type { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import type { long } from '../../data-types/long'
import type { ReferenceType } from '../../data-types/ReferenceType'
import type { short } from '../../data-types/short'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class iaload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as int
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		return 'iaload'
	}
}

export class laload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as long
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		return 'laload'
	}
}

export class faload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as float
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		return 'faload'
	}
}

export class daload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as double
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		return 'daload'
	}
}

export class aaload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		RuntimeManager.it().push(valueRef)
	}

	public override toString(): string {
		return 'aaload'
	}
}

export class baload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as byte
		RuntimeManager.it().push(new int(this.signExtendToInt(value.get() as number)))
	}

	public override toString(): string {
		return 'baload'
	}

	private signExtendToInt(value: number): number {
		const binary = value.toString(2).padStart(8, '0')
		const extended = binary.padStart(32, binary.charAt(0))
		return Number.parseInt(extended, 2) >> 0
	}
}

export class caload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as char
		// FIXME: zero-extension?
		RuntimeManager.it().push(new int(value.get() as number))
	}

	public override toString(): string {
		return 'caload'
	}
}

export class saload extends Instruction {
	override length = 1

	public override execute(): void {
		const index = RuntimeManager.it().pop() as int
		const arrayRef = RuntimeManager.it().pop() as ReferenceType
		const heapObject = RuntimeManager.it().load(arrayRef) as ArrayType
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		const value = RuntimeManager.it().load(valueRef) as short
		RuntimeManager.it().push(new int(this.signExtendToInt(value.get() as number)))
	}

	public override toString(): string {
		return 'saload'
	}

	private signExtendToInt(value: number): number {
		const binary = value.toString(2).padStart(8, '0')
		const extended = binary.padStart(32, binary.charAt(0))
		return Number.parseInt(extended, 2) >> 0
	}
}
