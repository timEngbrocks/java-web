export class long {
    static MAX = 9223372036854775807n
    static MIN = -9223372036854775808n

    value: bigint = 0n
    public get(): bigint {
        return this.value
    }
    public set(value: bigint) {
        if (value <= long.MAX && value >= long.MIN) this.value = value
        else throw `invalid long assignment: ${value}`
    }
}