export class short {
    static MAX = 32767
    static MIN = -32768

    value: number = 0
    public get(): number {
        return this.value
    }
    public set(value: number) {
        if (value <= short.MAX && value >= short.MIN) this.value = value
        else throw `invalid short assignment: ${value}`
    }
}