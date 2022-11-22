import { IntegralType } from "./data-type"

export class int extends IntegralType<number> {
    public isWide: boolean = false

    static MAX = 2147483647
    static MIN = -2147483648

    private value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= int.MAX && value >= int.MIN) this.value = value
        else throw `invalid int assignment: ${value}`
    }
    public toString(): string { return `${this.value} (int)` }
}