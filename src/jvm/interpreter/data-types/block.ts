import { DataType } from "./data-type";

export class Block extends DataType<undefined> {
    public isWide: boolean = false
    public get(): undefined { return undefined }
    public set(value: undefined): void { throw 'Tried setting block type' }
}