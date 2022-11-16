import { ClassObject } from "../ClassObject"
import { array } from "../data-types/array"
import { InterfaceObject } from "../InterfaceObject"

export type HeapData = ClassObject | InterfaceObject | array<any>

export enum HEAP_TYPES {
    CLASS,
    INTERFACE,
    ARRAY,
}

export class HeapAddress {
    constructor(private value: number, private type: HEAP_TYPES) {}
    public get(): number { return this.value }
    public getType(): HEAP_TYPES { return this.type }
}

export class Heap {

    private count: number = 0
    private classHeap: Map<number, ClassObject> = new Map<number, ClassObject>()
    private interfaceHeap: Map<number, InterfaceObject> = new Map<number, InterfaceObject>()
    private arrayHeap: Map<number, array<any>> = new Map<number, array<any>>()
    
    public allocate(value: HeapData): HeapAddress {
        if (value instanceof ClassObject) {
            const address = new HeapAddress(this.count, HEAP_TYPES.CLASS)
            this.classHeap.set(this.count, value)
            this.count++
            return address
        } else if (value instanceof InterfaceObject) {
            const address = new HeapAddress(this.count, HEAP_TYPES.INTERFACE)
            this.interfaceHeap.set(this.count, value)
            this.count++
            return address
        } else if (value instanceof array<any>) {
            const address = new HeapAddress(this.count, HEAP_TYPES.ARRAY)
            this.arrayHeap.set(this.count, value)
            this.count++
            return address
        }
        throw 'Tried to allocate object onto heap that is not a class, interface or array'
    }

    public load(address: HeapAddress): HeapData {
        const index = address.get()
        switch (address.getType()) {
            case HEAP_TYPES.CLASS: {
                const value = this.classHeap.get(index)
                if (!value) throw `Could not load class at ${index}`
                return value
            }
            case HEAP_TYPES.INTERFACE: {
                const value = this.interfaceHeap.get(index)
                if (!value) throw `Could not interface class at ${index}`
                return value
            }
            case HEAP_TYPES.ARRAY: {
                const value = this.arrayHeap.get(index)
                if (!value) throw `Could not load array at ${index}`
                return value
            }
        }
    }

}