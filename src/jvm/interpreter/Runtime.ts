import { CPInfo } from "../class-loader/parser/types/CPInfo"
import { ClassObject } from "./ClassObject"
import { DataType } from "./data-types/data-type"
import { HeapAddress, HeapData } from "./memory/heap"
import { LocalVariable } from "./memory/local-variable"

export class Runtime {
    private static classObject: ClassObject
    public static set(classObject: ClassObject): void {
        this.classObject = classObject
    }
    public static getConstant(index: number): CPInfo<any> {
        return this.classObject.getConstant(index)
    }

    public static allocate(value: any): HeapAddress {
        return this.classObject.allocate(value)
    }

    public static load(address: HeapAddress): HeapData {
        return this.classObject.load(address)
    }

    public static push(value: DataType<any>): void {
        this.classObject.push(value)
    }

    public static pop(): DataType<any> {
        return this.classObject.pop()
    }

    public static peek(): DataType<any> {
        return this.classObject.peek()
    }

    public static setLocalVariable(variable: LocalVariable, index: number): void {
        this.classObject.setLocalVariable(variable, index)
    }

    public static getLocalVariable(index: number): LocalVariable {
        return this.classObject.getLocalVariable(index)
    }

    public static jumpByOffset(offset: number): void {
        this.classObject.jumpByOffset(offset)
    }
}