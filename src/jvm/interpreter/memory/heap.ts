import { ArrayType, PrimitiveType, ReferenceType } from '../data-types/data-type'
import { InterfaceObject } from '../class/InterfaceObject'
import { ClassInstance } from '../class/ClassInstance'
import { isString } from 'lodash'
import { ClassObjectManager } from '../class/ClassObjectManager'

export type HeapData = ClassInstance | string | InterfaceObject | ArrayType | PrimitiveType

export enum HEAP_TYPES {
	CLASS,
	UNRESOLVED_CLASS_OR_INTERFACE,
	INTERFACE,
	ARRAY,
	PRIMITIVE
}

export class HeapAddress {
	constructor(private readonly value: number, private readonly type: HEAP_TYPES) {}
	public get(): number { return this.value }
	public getType(): HEAP_TYPES { return this.type }
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
				}
				if (ClassObjectManager.isClass(className)) {
					const instance = ClassObjectManager.newInstance(className)
					this.classHeap.set(index, instance)
					this.unresolvedClassHeap.delete(index)
					reference = new ReferenceType({ address: new HeapAddress(index, HEAP_TYPES.CLASS), name: instance.getName() })
					return instance
				} else if (ClassObjectManager.isInterface(className)) {
					const interfaceObject = ClassObjectManager.getInterface(className)
					this.interfaceHeap.set(index, interfaceObject)
					this.unresolvedClassHeap.delete(index)
					reference = new ReferenceType({ address: new HeapAddress(index, HEAP_TYPES.CLASS), name: interfaceObject.getName() })
					return interfaceObject
				} else throw new Error(`Could not resolve ${className}. Its neither a class nor an interface`)
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
}
