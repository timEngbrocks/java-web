import { VoidType } from "./data-type";

export class Void extends VoidType {
    public isWide: boolean = false
    public get(): undefined { return undefined }
    public set(value: undefined): void { throw 'Tried setting void' }
    public toString(): string { return 'void' }
}