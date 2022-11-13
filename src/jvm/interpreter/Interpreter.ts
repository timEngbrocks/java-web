import { AttributeCode } from "../class-loader/parser/types/attributes/AttributeCode"
import { ClassFile } from "../class-loader/parser/types/ClassFile"
import { ConstantUtf8 } from "../class-loader/parser/types/constants/ConstantUtf8"
import { CPInfo } from "../class-loader/parser/types/CPInfo"
import { DataType } from "./data-types/data-type"
import { HeapObject } from "./data-types/heapObject"
import { Reference } from "./data-types/reference"
import { InstructionStream } from "./InstructionStream"
import { ConstantPool } from "./memory/constant-pool"
import { Frame } from "./memory/frame"
import { Heap, HeapAddress } from "./memory/heap"
import { LocalVariable } from "./memory/local-variable"
import { Runtime } from "./Runtime"

export class Interpreter {
    private runtimeConstantPool: ConstantPool = new ConstantPool([])

    private heap: Heap = new Heap()

    private activeFrame: Frame = new Frame('', 0, 0)
    private frames: Frame[] = []

    private activeInstructionStream: InstructionStream = new InstructionStream('', '')
    private instructionStreams: InstructionStream[] = []

    constructor(classFile: ClassFile) {
        this.initialize(classFile)
        Runtime.set(this)
    }

    public getConstant(index: number): CPInfo<any> {
        return this.runtimeConstantPool.get(index)
    }

    public allocate(value: any): HeapAddress {
        return this.heap.allocate(value)
    }

    public load(address: HeapAddress): HeapObject {
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

    public execute(): void {
        console.log()
        console.log('--------executing------------')
        console.log()

        while (this.activeInstructionStream.hasNext()) {
            const instruction = this.activeInstructionStream.next()

            console.log(instruction.toString())
            instruction.execute()

        }

        console.log()
        console.log('--------state after execution------------')
        console.log()
        console.log(this.activeFrame.operandStack.getStackOverview())
        console.log(this.activeFrame.getLocalVariablesOverview())

    }

    private initialize(classFile: ClassFile): void {
        this.runtimeConstantPool = new ConstantPool(classFile.data.header.constantPool)

        classFile.data.methods.forEach(method => {
            const name = (this.runtimeConstantPool.get(method.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const code = method.data.attributes.find(attribute => attribute instanceof AttributeCode) as AttributeCode

            if (name !== 'main') return

            const frame = new Frame(name, code.data.maxLocals, code.data.maxStack)
            const thisAddress = this.heap.allocate(classFile)
            const thisReference = new Reference()
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