import { DataType } from "./data-type"

export class reference<HeapAddress> extends DataType<HeapAddress | null> {
    public isWide: boolean = false

    private value: HeapAddress | null = null
    public get(): HeapAddress | null {
        return this.value
    }
    public set(value: HeapAddress | null): void {
        this.value = value
    }
    public toString(): string { return 'reference' }
}