export class float {
    static NaN = Number.NaN
    static positiveInfinity = Number.POSITIVE_INFINITY
    static negativeInfinity = Number.NEGATIVE_INFINITY

    static eMAX = 127
    static eMIN = -128
    static mMAX = 16777216
    static mMIN = 0

    sign: number = 1
    exponent: number = 0
    mantisse: number = 0
    public get(): number {
        return this.sign * this.mantisse * Math.pow(2, this.exponent - 25)
    }
    public set(sign: number, exponent: number, mantisse: number) {
        if (!(sign === -1 || sign === 1)) {
            throw `Invalid float assignment: sign = ${sign}`
        }
        if (!(exponent >= float.eMIN && exponent <= float.eMAX)) {
            throw `Invalid float assignment: exponent = ${exponent}`
        }
        if (!(mantisse >= float.mMIN && mantisse < float.mMAX)) {
            throw `Invalid float assignment: mantisse = ${mantisse}`
        }
        this.sign = sign
        this.exponent = exponent
        this.mantisse = mantisse
    }
}