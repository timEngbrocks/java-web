export class int {
    static MAX = 2147483647
    static MIN = -2147483648

    value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= int.MAX && value >= int.MIN) this.value = value
        else throw `invalid int assignment: ${value}`
    }
}