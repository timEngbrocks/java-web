import { IntegralType } from "./data-type"

export class short extends IntegralType<number> {
    public isWide: boolean = false

    static MAX = 32767
    static MIN = -32768

    private value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= short.MAX && value >= short.MIN) this.value = value
        else throw `invalid short assignment: ${value}`
    }
    public toString(): string { return 'short' }
}