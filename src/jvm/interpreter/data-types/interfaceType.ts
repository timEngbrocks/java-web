import { InterfaceObject } from "../InterfaceObject";
import { InterfaceType } from "./data-type";

export class interfaceType extends InterfaceType {
    public isWide: boolean = false

    private value: InterfaceObject = new InterfaceObject()
    public get(): InterfaceObject {
        return this.value
    }
    public set(value: InterfaceObject): void {
        this.value = value
    }
    public toString(): string { return 'interface' }
}