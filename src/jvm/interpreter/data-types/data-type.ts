import { ClassObject } from '../ClassObject'
import { InterfaceObject } from '../InterfaceObject'
import { array } from './array'

export abstract class DataType<T> {
	public abstract isWide: boolean
	public abstract get(): T
	public abstract set(value: T): void
	public abstract toString(): string
}

export abstract class PrimitiveType<T> extends DataType<T> {}
export abstract class NumericType<T> extends PrimitiveType<T> {}
export abstract class IntegralType<T> extends NumericType<T> {}
export abstract class FloatingPointType<T> extends NumericType<T> {}
export abstract class ReturnAddressType<T> extends PrimitiveType<T> {}
export abstract class ClassType extends DataType<ClassObject> {}
export abstract class InterfaceType extends DataType<InterfaceObject> {}
export abstract class VoidType extends DataType<undefined> {}

export type DescriptorType = (new () => (PrimitiveType<any> | ClassType)) | { new (type: new () => any, values?: any[]): array<any>, prototype: array<any> }
