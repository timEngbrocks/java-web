import { InterfaceObject } from '../class/InterfaceObject'
import { ClassInstance } from '../class/ClassInstance'
import { isString } from 'lodash'
import { ArrayType } from '../data-types/ArrayType'
import { PrimitiveType } from '../data-types/PrimitiveType'
import { ReferenceType } from '../data-types/ReferenceType'
import { HeapAddress } from './HeapAddress'
import type { HeapData } from './HeapData'
import { HEAP_TYPES } from './HeapTypes'
import { long } from '../data-types/long'
import type { DataType } from '../data-types/data-type'
import { RuntimeManager } from '../manager/RuntimeManager'
import { int } from '../data-types/int'

export class DirectHeapAddress {
	public static decode(encodedValue: long): { reference: ReferenceType, fieldOffset: number } {
		const value = encodedValue.get() as bigint
		const typeId = Number(value >> 128n)
		const address = Number((value >> 64n) & 0xffffffffffffffffn)
		const fieldOffset = Number(value & 0xffffffffffffffffn)
		return {
			reference: new ReferenceType({
				address: new HeapAddress(address, typeId),
				name: 'DHA decode'
			}),
			fieldOffset
		}
	}

	public static getValue(encodedValue: long): DataType<any> {
		const { reference, fieldOffset } = DirectHeapAddress.decode(encodedValue)
		const object = RuntimeManager.it().load(reference)
		if (object instanceof ClassInstance) {
			return object.getAllFieldsInOrder()[fieldOffset][1]
		} else if (object instanceof ArrayType) {
			return object.get()[fieldOffset]
		} else throw new Error(`DHA: could not get value for: ${reference}, ${fieldOffset} -> ${JSON.stringify(object)} from ${encodedValue}`)
	}

	public static getValueSmall(encodedValue: long): number {
		return Number((encodedValue.get() as bigint) & 0xffffffffffffffffn)
	}

	private readonly value: long
	private readonly valueSmall: int

	constructor(reference: ReferenceType, offset: number) {
		if (!reference.get().address) throw new Error(`Tried creating DHA with null ref: ${reference}, ${offset}`)
		const typeComponent = BigInt(reference.get().address!.getType() & 0b111) << 128n
		const addressComponent = BigInt(reference.get().address!.get()) << 64n
		this.value = new long(typeComponent | addressComponent | BigInt(offset))
		this.valueSmall = new int(offset)
	}

	public getEncodedValue(): long {
		return this.value
	}

	public getEncodedValueSmall(): int {
		return this.valueSmall
	}
}

export class Heap {
	private count: number = 0
	private readonly unresolvedClassHeap = new Map<number, string>()
	private readonly classHeap = new Map<number, ClassInstance>()
	private readonly interfaceHeap = new Map<number, InterfaceObject>()
	private readonly arrayHeap = new Map<number, ArrayType>()
	private readonly primitiveHeap = new Map<number, PrimitiveType>()

	public allocate(value: HeapData): ReferenceType {
		if (value instanceof InterfaceObject) {
			const address = new HeapAddress(this.count, HEAP_TYPES.INTERFACE)
			this.interfaceHeap.set(this.count, value)
			this.count++
			return new ReferenceType({ address, name: value.getName() })
		} else if (value instanceof ArrayType) {
			const address = new HeapAddress(this.count, HEAP_TYPES.ARRAY)
			this.arrayHeap.set(this.count, value)
			this.count++
			return new ReferenceType({ address, name: value.toString() })
		} else if (value instanceof ClassInstance) {
			const address = new HeapAddress(this.count, HEAP_TYPES.CLASS)
			this.classHeap.set(this.count, value)
			this.count++
			return new ReferenceType({ address, name: value.getName() })
		} else if (isString(value)) {
			const address = new HeapAddress(this.count, HEAP_TYPES.UNRESOLVED_CLASS_OR_INTERFACE)
			this.unresolvedClassHeap.set(this.count, value)
			this.count++
			return new ReferenceType({ address, name: value })
		} else if (value instanceof PrimitiveType) {
			const address = new HeapAddress(this.count, HEAP_TYPES.PRIMITIVE)
			this.primitiveHeap.set(this.count, value)
			this.count++
			return new ReferenceType({ address, name: value.toString() })
		}
		throw new Error(`Tried allocating value to heap which is not Interface, Array, ClassInstance or unresolved ClassInstance: ${value}`)
	}

	public load(reference: ReferenceType): HeapData {
		if (!reference.get().address) throw new Error(`Null dereference: ${reference}`)
		const index = reference.get().address!.get()
		switch (reference.get().address!.getType()) {
			case HEAP_TYPES.CLASS: {
				return this.classHeap.get(index)!
			}
			case HEAP_TYPES.UNRESOLVED_CLASS_OR_INTERFACE: {
				const className = this.unresolvedClassHeap.get(index)
				if (!className) {
					const instance = this.classHeap.get(index)
					if (instance) {
						reference = new ReferenceType({ address: new HeapAddress(index, HEAP_TYPES.CLASS), name: instance.getName() })
						return instance
					} else {
						const interfaceObject = this.interfaceHeap.get(index)
						if (!interfaceObject) throw new Error(`Found invalid reference while resolving class or interface: ${reference}`)
						reference = new ReferenceType({ address: new HeapAddress(index, HEAP_TYPES.INTERFACE), name: interfaceObject.getName() })
						return interfaceObject
					}
				} else return className
			}
			case HEAP_TYPES.INTERFACE: {
				const value = this.interfaceHeap.get(index)
				if (!value) throw new Error(`Could not load interface at ${index}`)
				return value
			}
			case HEAP_TYPES.ARRAY: {
				const value = this.arrayHeap.get(index)
				if (!value) throw new Error(`Could not load array at ${index}`)
				return value
			}
			case HEAP_TYPES.PRIMITIVE: {
				const value = this.primitiveHeap.get(index)
				if (!value) throw new Error(`Could not load primitve at ${index}`)
				return value
			}
		}
	}

	public markUnresolvedClassAsResolved(index: number, instance: ClassInstance): void {
		this.classHeap.set(index, instance)
		this.unresolvedClassHeap.delete(index)
	}

	public markUnresolvedInterfaceAsResolved(index: number, interfaceObject: InterfaceObject): void {
		this.interfaceHeap.set(index, interfaceObject)
		this.unresolvedClassHeap.delete(index)
	}
}
