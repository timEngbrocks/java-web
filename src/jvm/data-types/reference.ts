import { DataType } from "./data-type"

export class Reference extends DataType<any> {
    public isWide: boolean = false

    private value: any = null
    public get(): any {
        return this.value
    }
    public set(value: any): void {
        this.value = value
    }
}