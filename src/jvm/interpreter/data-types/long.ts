import { DataType } from "./data-type"

export class long extends DataType<bigint> {
    public isWide: boolean = true

    static MAX = 9223372036854775807n
    static MIN = -9223372036854775808n

    private value: bigint = 0n
    public get(): bigint {
        return this.value
    }
    public set(value: bigint) {
        if (value <= long.MAX && value >= long.MIN) this.value = value
        else throw `invalid long assignment: ${value}`
    }
    public toString(): string { return 'long' }
}