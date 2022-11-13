import { DataType } from "./data-type";

export class HeapObject extends DataType<any> {
    public isWide: boolean = false

    private value: any
    constructor(value: any) {
        super()
        this.value = value
    }

    public get(): any {
        return this.value
    }
    public set(value: any): void {
        this.value = value
    }
}