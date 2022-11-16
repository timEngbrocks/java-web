import { FloatingPointType } from "./data-type"

export class double extends FloatingPointType<number> {
    public isWide: boolean = true

    static NaN = Number.NaN
    static positiveInfinity = Number.POSITIVE_INFINITY
    static negativeInfinity = Number.NEGATIVE_INFINITY

    private value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        this.value = value
    }
    public toString(): string { return 'double' }
}