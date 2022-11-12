export class char {
    static MAX = 65535
    static MIN = 0

    value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= char.MAX && value >= char.MIN) this.value = value
        else throw `invalid char assignment: ${value}`
    }
}