import { HeapObject } from "../data-types/heapObject"

export type HeapAddress = number

export class Heap {

    private count: number = 0
    private map: Map<HeapAddress, HeapObject> = new Map<HeapAddress, HeapObject>()
    
    public allocate(value: any): HeapAddress {
        const address: HeapAddress = this.count
        this.map.set(address, new HeapObject(value))
        this.count++
        return address
    }

    public load(address: HeapAddress): HeapObject {
        if (!address && address !== 0) throw 'null dereference'
        const value = this.map.get(address)
        if (!value) throw `Could not load value at ${address}`
        return value
    }

}