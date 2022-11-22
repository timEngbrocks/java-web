import { IntegralType } from "./data-type"

export class char extends IntegralType<number> {
    public isWide: boolean = false

    static MAX = 65535
    static MIN = 0

    private value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= char.MAX && value >= char.MIN) this.value = value
        else throw `invalid char assignment: ${value}`
    }
    public toString(): string { return `${this.value} (char)` }
}