import { Block } from "../data-types/block"
import { DataType } from "../data-types/data-type"

export class OperandStack {

    private size: number
    private stack: DataType<any>[] = []

    constructor(size: number) {
        this.size = size
    }

    public push(value: DataType<any>): void {
        if (this.stack.length === this.size || (this.stack.length === this.size - 1 && value.isWide)) {
            throw `OperandStack is full. Can not push: ${value.get()}`
        }
        this.stack.push(value)
        if (value.isWide) this.stack.push(new Block())
    }

    public pop(): DataType<any> {
        if (this.stack.length === 0) {
            throw 'Can not pop. Operand Stack is empty'
        }
        
        let value = this.stack.pop()
        if (value instanceof Block) value = this.stack.pop()

        if (value) return value
        else throw `OperandStack pop failed even though it has size: ${this.stack.length}`
    }

    public peek(): DataType<any> {
        if (this.stack.length === 0) {
            throw 'Can not peek. Operand Stack is empty'
        }
        let value = this.pop()
        if (value instanceof Block) {
            value = this.pop()
            this.push(value)
            this.push(new Block())
        } else {
            this.push(value)
        }
        return value
    }

    public getStackOverview(): string {
        let overview = "OperandStack:\n"
        for (let i = this.stack.length - 1; i >= 0; i--) {
            const element = this.stack[i]
            overview += `@${i}: ${element}\n`
        }
        return overview
    }

}