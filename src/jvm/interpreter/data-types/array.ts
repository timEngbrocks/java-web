import { DataType } from "./data-type";

export class array<T extends DataType<any>> {
    public isWide: boolean = false
    constructor(private type: new () => T, private values: T[] = []) {}
    public length(): number { return this.values.length }
    public push(value: T): void { this.values.push(value) }
    public pop(): T | undefined { return this.values.pop() }
    public getAt(index: number): T { return this.values[index] }
    public get(): T[] { return this.values }
    public setAt(value: T, index: number): void { this.values[index] = value }
    public set(values: T[]): void { this.values = values }
    public getType(): T { return new this.type() }
    public toString(): string { return 'array' }
}