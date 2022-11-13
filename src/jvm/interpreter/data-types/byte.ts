import { DataType } from "./data-type"

export class byte extends DataType<number> {
    public isWide: boolean = false

    static MAX = 127
    static MIN = -128

    private value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= byte.MAX && value >= byte.MIN) this.value = value
        else throw `invalid byte assignment: ${value}`
    }
}