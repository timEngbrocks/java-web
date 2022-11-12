export class double {
    static NaN = Number.NaN
    static positiveInfinity = Number.POSITIVE_INFINITY
    static negativeInfinity = Number.NEGATIVE_INFINITY

    static eMAX = 1023
    static eMIN = -1022
    static mMAX = Number.MAX_SAFE_INTEGER
    static mMIN = 0

    sign: number = 1
    exponent: number = 0
    mantisse: number = 0
    public get(): number {
        return this.sign * this.mantisse * Math.pow(2, this.exponent - 54)
    }
    public set(sign: number, exponent: number, mantisse: number) {
        if (!(sign === -1 || sign === 1)) {
            throw `Invalid double assignment: sign = ${sign}`
        }
        if (!(exponent >= double.eMIN && exponent <= double.eMAX)) {
            throw `Invalid double assignment: exponent = ${exponent}`
        }
        if (!(mantisse >= double.mMIN && mantisse <= double.mMAX)) {
            throw `Invalid double assignment: mantisse = ${mantisse}`
        }
        this.sign = sign
        this.exponent = exponent
        this.mantisse = mantisse
    }
}