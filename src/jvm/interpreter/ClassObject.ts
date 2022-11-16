import { AttributeCode } from "../class-loader/parser/types/attributes/AttributeCode"
import { ClassFile } from "../class-loader/parser/types/ClassFile"
import { ConstantUtf8 } from "../class-loader/parser/types/constants/ConstantUtf8"
import { CPInfo } from "../class-loader/parser/types/CPInfo"
import { DataType } from "./data-types/data-type"
import { reference } from "./data-types/references"
import { InstructionStream } from "./InstructionStream"
import { ConstantPool } from "./memory/constant-pool"
import { Frame } from "./memory/frame"
import { Heap, HeapAddress, HeapData } from "./memory/heap"
import { LocalVariable } from "./memory/local-variable"

export class ClassObject {
    public runtimeConstantPool: ConstantPool = new ConstantPool([])

    public heap: Heap = new Heap()

    public activeFrame: Frame = new Frame('', 0, 0)
    public frames: Frame[] = []

    public activeInstructionStream: InstructionStream = new InstructionStream('', '')
    public instructionStreams: InstructionStream[] = []

    public getConstant(index: number): CPInfo<any> {
        return this.runtimeConstantPool.get(index)
    }

    public allocate(value: HeapData): HeapAddress {
        return this.heap.allocate(value)
    }

    public load(address: HeapAddress): HeapData {
        return this.heap.load(address)
    }

    public push(value: DataType<any>): void {
        this.activeFrame.operandStack.push(value)
    }

    public pop(): DataType<any> {
        return this.activeFrame.operandStack.pop()
    }

    public setLocalVariable(variable: LocalVariable, index: number): void {
        this.activeFrame.setLocalVariable(variable, index)
    }

    public getLocalVariable(index: number): LocalVariable {
        return this.activeFrame.getLocalVariable(index)
    }

    public initialize(classFile: ClassFile): void {
        this.runtimeConstantPool = new ConstantPool(classFile.data.header.constantPool)

        classFile.data.methods.forEach(method => {
            const name = (this.runtimeConstantPool.get(method.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const code = method.data.attributes.find(attribute => attribute instanceof AttributeCode) as AttributeCode

            if (name !== 'main') return // FIXME:

            const frame = new Frame(name, code.data.maxLocals, code.data.maxStack)
            const thisAddress = this.heap.allocate(this)
            const thisReference = new reference() // FIXME:
            thisReference.set(thisAddress)
            frame.setLocalVariable(new LocalVariable(thisReference), 0)
            const instructionStream = new InstructionStream(name, code.getCode())
            
            if (name === 'main') {
                this.activeFrame = frame
                this.activeInstructionStream = instructionStream
            }
            this.frames.push(frame)
            this.instructionStreams.push(instructionStream)
        })
    }

}