import { ReturnAddressType } from "./data-type"

export class returnAddress extends ReturnAddressType<number> {
    public isWide: boolean = false

    private value: number = -1
    public get(): number {
        return this.value
    }
    public set(value: number): void {
        this.value = value
    }
    public toString(): string { return `${this.value} (returnAddress)` }
}