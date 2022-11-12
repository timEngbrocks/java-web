import { ClassFile } from "../types/ClassFile";
import { ConstantPool } from "./memory/constantPool";
import { Heap } from "./memory/heap";
import { MethodArea } from "./memory/methodArea";
import { PCRegister } from "./memory/pcRegister";
import { Stack } from "./memory/stack";

export class JVMService {
    static instance: JVM
    static get(): JVM {
        if (!this.instance) {
            this.instance = new JVM()
        }
        return this.instance
    }
}

export class JVM {

    private pcRegister = new PCRegister()
    private stack = new Stack()
    private heap = new Heap()

    private methodArea = new MethodArea()
    private runtimeConstantPool = new ConstantPool()

    public run(classes: ClassFile[]): void {
        
    }

}