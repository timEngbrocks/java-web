export interface JTypeData {}

export class JType<T extends JTypeData> {
    public data: T

    constructor(data: T) {
        this.data = data
    }

    public toString(): string {
        return 'JType'
    }
}