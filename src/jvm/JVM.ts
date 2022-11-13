import { AttributeCode } from "../types/attributes/AttributeCode";
import { ClassFile } from "../types/ClassFile";
import { ConstantUtf8 } from "../types/constants/ConstantUtf8";
import { CPInfo } from "../types/CPInfo";
import { InstructionStream } from "./InstructionStream";
import { ConstantPool } from "./memory/constant-pool";
import { Frame } from "./memory/frame";

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

    activeFrame: Frame = new Frame(0, 0, new ConstantPool([]))
    frames: Frame[] = []

    activeInstructionStream: InstructionStream = new InstructionStream('', '')
    instructionStreams: InstructionStream[] = []

    public run(classFile: ClassFile): void {

        this.initialize(classFile)
        
        while (this.activeInstructionStream.hasNext()) {
            const instruction = this.activeInstructionStream.next()

            console.log(instruction.toString())

        }

    }

    private initialize(classFile: ClassFile): void {
        this.runtimeConstantPool = new ConstantPool(classFile.data.header.constantPool)

        classFile.data.methods.forEach(method => {
            const name = (this.runtimeConstantPool.get(method.data.nameIndex - 1) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const code = method.data.attributes.find(attribute => attribute instanceof AttributeCode) as AttributeCode

            const frame = new Frame(code.data.maxLocals, code.data.maxStack, this.runtimeConstantPool)
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