import { AttributeCode } from "../types/attributes/AttributeCode";
import { ClassFile } from "../types/ClassFile";
import { ConstantUtf8 } from "../types/constants/ConstantUtf8";
import { Reference } from "./data-types/reference";
import { InstructionStream } from "./InstructionStream";
import { ConstantPool } from "./memory/constant-pool";
import { Frame } from "./memory/frame";
import { Heap } from "./memory/heap";
import { LocalVariable } from "./memory/local-variable";

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

    runtimeConstantPool: ConstantPool = new ConstantPool([])

    heap: Heap = new Heap()

    activeFrame: Frame = new Frame(0, 0, new ConstantPool([]))
    frames: Frame[] = []

    activeInstructionStream: InstructionStream = new InstructionStream('', '')
    instructionStreams: InstructionStream[] = []

    public run(classFile: ClassFile): void {

        this.initialize(classFile)
        
        while (this.activeInstructionStream.hasNext()) {
            const instruction = this.activeInstructionStream.next()

            console.log(instruction.toString())
            instruction.execute()

        }

        console.log(this.activeFrame.getLocalVariablesOverview())
        console.log(this.activeFrame.operandStack.getStackOverview())

    }

    private initialize(classFile: ClassFile): void {
        this.runtimeConstantPool = new ConstantPool(classFile.data.header.constantPool)

        classFile.data.methods.forEach(method => {
            const name = (this.runtimeConstantPool.get(method.data.nameIndex - 1) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const code = method.data.attributes.find(attribute => attribute instanceof AttributeCode) as AttributeCode

            const frame = new Frame(code.data.maxLocals, code.data.maxStack, this.runtimeConstantPool)
            const thisAddress = this.heap.allocate(classFile)
            const thisReference = new Reference()
            thisReference.set(thisAddress)
            frame.setLocalVariable(new LocalVariable(thisReference), 0)
            const instructionStream = new InstructionStream(name, code.getCode())

            if (name === '<init>') {
                this.activeFrame = frame
                this.activeInstructionStream = instructionStream
            }
            else {
                this.frames.push(frame)
                this.instructionStreams.push(instructionStream)
            }
        })
    }

}