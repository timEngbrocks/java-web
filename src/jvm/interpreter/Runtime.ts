import { CPInfo } from "../class-loader/parser/types/CPInfo"
import { DataType } from "./data-types/data-type"
import { HeapObject } from "./data-types/heapObject"
import { Interpreter } from "./Interpreter"
import { HeapAddress } from "./memory/heap"
import { LocalVariable } from "./memory/local-variable"

export class Runtime {
    private static interpreter: Interpreter
    public static set(interpreter: Interpreter): void {
        this.interpreter = interpreter
    }
    public static getConstant(index: number): CPInfo<any> {
        return this.interpreter.getConstant(index)
    }

    public static allocate(value: any): HeapAddress {
        return this.interpreter.allocate(value)
    }

    public static load(address: HeapAddress): HeapObject {
        return this.interpreter.load(address)
    }

    public static push(value: DataType<any>): void {
        this.interpreter.push(value)
    }

    public static pop(): DataType<any> {
        return this.interpreter.pop()
    }

    public static setLocalVariable(variable: LocalVariable, index: number): void {
        this.interpreter.setLocalVariable(variable, index)
    }

    public static getLocalVariable(index: number): LocalVariable {
        return this.interpreter.getLocalVariable(index)
    }
}