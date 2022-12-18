import { ClassInterface } from '../class/ClassInterface'
import { InterfaceObject } from '../class/InterfaceObject'
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

	public override toString(): string { return `classType: ${this.value.getName()}` }
}
export class ArrayType extends DescriptorType<Array<ReferenceType>> {
	constructor(public type: DataType<any>, protected length = 0) {
		super(new Array<ReferenceType>(length).fill(new ReferenceType()))
	}

	public override toString(): string { return `array ${this.type.toString()}` }
}

export class InterfaceType extends DataType<InterfaceObject> {
	constructor(protected value = new InterfaceObject()) {
		super(value)
	}

	public override toString(): string { return 'interfaceType' }
}

export type reference = HeapAddress | null
export class ReferenceType extends DescriptorType<reference> {
	constructor(protected value: reference = null, public name: string = '') {
		super(value)
	}

	public override toString(): string { return `referenceType: ${this.value?.getType()} -> '${this.name}'` }
}
export class BlockType extends DataType<undefined> {
	constructor(protected value = undefined) {
		super(value)
	}
}
