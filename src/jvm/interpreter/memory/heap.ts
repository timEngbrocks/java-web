import { ArrayType, PrimitiveType } from '../data-types/data-type'
import { InterfaceObject } from '../class/InterfaceObject'
import { ClassInstance } from '../class/ClassInstance'
import { isString } from 'lodash'
import { ClassObjectManager } from '../class/ClassObjectManager'

export type HeapData = ClassInstance | string | InterfaceObject | ArrayType | PrimitiveType

export enum HEAP_TYPES {
	CLASS,
	UNRESOLVED_CLASS,
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

	public allocate(value: HeapData): HeapAddress {
		if (value instanceof InterfaceObject) {
			const address = new HeapAddress(this.count, HEAP_TYPES.INTERFACE)
			this.interfaceHeap.set(this.count, value)
			this.count++
			return address
		} else if (value instanceof ArrayType) {
			const address = new HeapAddress(this.count, HEAP_TYPES.ARRAY)
			this.arrayHeap.set(this.count, value)
			this.count++
			return address
		} else if (value instanceof ClassInstance) {
			const address = new HeapAddress(this.count, HEAP_TYPES.CLASS)
			this.classHeap.set(this.count, value)
			this.count++
			return address
		} else if (isString(value)) {
			const address = new HeapAddress(this.count, HEAP_TYPES.UNRESOLVED_CLASS)
			this.unresolvedClassHeap.set(this.count, value)
			this.count++
			return address
		} else if (value instanceof PrimitiveType) {
			const address = new HeapAddress(this.count, HEAP_TYPES.PRIMITIVE)
			this.primitiveHeap.set(this.count, value)
			this.count++
			return address
		}
		throw new Error('Tried allocating value to heap which is not Interface, Array, ClassInstance or unresolved ClassInstance')
	}

	public load(address: HeapAddress): HeapData {
		const index = address.get()
		switch (address.getType()) {
			case HEAP_TYPES.CLASS: {
				return this.classHeap.get(index)!
			}
			case HEAP_TYPES.UNRESOLVED_CLASS: {
				const className = this.unresolvedClassHeap.get(index)!
				if (!ClassObjectManager.doesClassExist(className)) throw new Error(`Heap could not resolve class name: ${className}`)
				const classInstance = ClassObjectManager.newInstance(className)
				this.classHeap.set(index, classInstance)
				this.unresolvedClassHeap.delete(index)
				return classInstance
			}
			case HEAP_TYPES.INTERFACE: {
				const value = this.interfaceHeap.get(index)
				if (!value) throw new Error(`Could not interface class at ${index}`)
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
