import { ClassInterface } from '../class/ClassInterface'
import { ExecutableInterface } from '../class/ExecutableInterface'
import { Interpreter } from '../Interpreter'
import { HeapAddress } from '../memory/heap'

export class DataType<T> {
	public isWide = false
	constructor(protected value?: T) {}
	public get(): T { return this.value! }
	public set(value: T): void { this.value = value }
	public toString(): string { return 'DataType' }
}

export class DescriptorType<T> extends DataType<T> {}

export class PrimitiveType extends DescriptorType<number | bigint> {
	constructor(protected value: number | bigint = 0) {
		super(value)
	}
}
export class ReturnAddressType extends PrimitiveType {
	constructor(protected value: number = -1) {
		super(value)
	}
}
export class NumericType extends PrimitiveType {}
export class IntegralType extends NumericType {}
export class FloatingPointType extends NumericType {}

export class ClassType extends DataType<ClassInterface> {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	constructor(protected value = {} as ClassInterface) {
		super(value)
	}

	public override toString(): string { return `classType: ${this.value.getName ? this.value.getName() : 'unset'}` }
}
export class ArrayType extends DescriptorType<Array<ReferenceType>> {
	constructor(public type: DataType<any>, protected length = 0) {
		super(new Array<ReferenceType>(length).fill(new ReferenceType({ address: null, name: `[${type.toString()}` })))
	}

	public override toString(): string { return `array ${this.type.toString()}` }
}

export class InterfaceType extends DataType<ExecutableInterface> {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	constructor(protected value = {} as ExecutableInterface) {
		super(value)
	}

	public override toString(): string { return `intefaceType: ${this.value.getName ? this.value.getName() : 'unset'}` }
}

export interface Reference {
	address: HeapAddress | null
	name: string
}
export class ReferenceType extends DescriptorType<Reference> {
	public readonly creationTime
	constructor(protected value: Reference = { address: null, name: 'uninitialized' }) {
		super(value)
		this.creationTime = Interpreter.globalPC
	}

	public override toString(): string { return `referenceType: ${this.value.address?.getType()} -> '${this.value.name}' {${this.creationTime}}` }
}
export class BlockType extends DataType<undefined> {
	constructor(protected value = undefined) {
		super(value)
	}
}
