import { Block } from "../data-types/block";
import { ConstantPool } from "./constant-pool";
import { LocalVariable } from "./local-variable";
import { OperandStack } from "./operand-stack";

export class Frame {
    
    public operandStack: OperandStack
    public runtimeConstantPool: ConstantPool

    private localVariables: LocalVariable[]

    constructor(variableCount: number, stackSize: number, runtimeConstantPool: ConstantPool) {
        this.localVariables = new Array<LocalVariable>(variableCount)
        this.operandStack = new OperandStack(stackSize)
        this.runtimeConstantPool = runtimeConstantPool
    }

    public getLocalVariable(index: number): LocalVariable {
        const variable = this.localVariables[index]
        if (!variable) throw `Tried loading unset local variable at ${index}`
        if (variable.get() instanceof Block) throw `Tried to get upper half of long or double local variable at ${index}`
        return variable
    }

    public setLocalVariable(variable: LocalVariable, index: number): void {
        if (variable.get().isWide) {
            if (index + 1 >= this.localVariables.length) throw `Tried setting long or double at the end of local variables`
            this.localVariables[index + 1] = new LocalVariable(new Block())
        }
        this.localVariables[index] = variable
    }

    public getLocalVariablesOverview(): string {
        let overview = "LocalVariables:\n"
        for (let i = 0; i < this.localVariables.length; i++) {
            const localVariable = this.localVariables[i].get()
            overview += `@${i}: ${localVariable.get()}\n`
        }
        return overview
    }

}