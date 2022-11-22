import { FieldAccessFlags } from "../class-loader/parser/FieldInfoParser"
import { AttributeCode } from "../class-loader/parser/types/attributes/AttributeCode"
import { AttributeConstantValue } from "../class-loader/parser/types/attributes/AttributeConstantValue"
import { ClassFile } from "../class-loader/parser/types/ClassFile"
import { ConstantUtf8 } from "../class-loader/parser/types/constants/ConstantUtf8"
import { ConstantValueData } from "../class-loader/parser/types/constants/ConstantValueData"
import { CPInfo } from "../class-loader/parser/types/CPInfo"
import { array } from "./data-types/array"
import { byte } from "./data-types/byte"
import { char } from "./data-types/char"
import { classType } from "./data-types/classType"
import { DataType, DescriptorType, PrimitiveType } from "./data-types/data-type"
import { double } from "./data-types/double"
import { float } from "./data-types/float"
import { int } from "./data-types/int"
import { long } from "./data-types/long"
import { reference } from "./data-types/references"
import { short } from "./data-types/short"
import { InstructionStream } from "./InstructionStream"
import { ConstantPool } from "./memory/constant-pool"
import { Frame } from "./memory/frame"
import { Heap, HeapAddress, HeapData } from "./memory/heap"
import { LocalVariable } from "./memory/local-variable"
import { Runtime } from "./Runtime"

export interface MethodContext {
    name: string
    activeFrame: Frame
    activeInstructionStream: InstructionStream
    returnType: any
}

export class ClassObject {
    public name: string = ''
    public hasMainMethod = false
    public runtimeConstantPool: ConstantPool = new ConstantPool([])
    public heap: Heap = new Heap()
    public currentMethod: MethodContext = {
        name: '',
        activeFrame: new Frame('', 0, 0),
        activeInstructionStream: new InstructionStream('', ''),
        returnType: DataType
    }
    public staticFields: Map<string, DataType<any>> = new Map()

    private callStack: MethodContext[] = []
    private methods: MethodContext[] = []

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
        this.currentMethod.activeFrame.operandStack.push(value)
    }

    public pop(): DataType<any> {
        return this.currentMethod.activeFrame.operandStack.pop()
    }

    public peek(): DataType<any> {
        return this.currentMethod.activeFrame.operandStack.peek()
    }

    public setLocalVariable(variable: LocalVariable, index: number): void {
        this.currentMethod.activeFrame.setLocalVariable(variable, index)
    }

    public getLocalVariable(index: number): LocalVariable {
        return this.currentMethod.activeFrame.getLocalVariable(index)
    }

    public jumpByOffset(offset: number): void {
        this.currentMethod.activeInstructionStream.setOffset(offset)
    }

    public callFunction(name: string): void {
        const methodContext = this.methods.find(methodContext => methodContext.name === name)
        if (!methodContext) throw `Could not find method: ${name}`
        this.callStack.push(this.currentMethod)
        this.currentMethod = methodContext
    }

    public returnFromFunction(): void {
        const methodContext = this.callStack.pop()
        if (!methodContext) return
        this.currentMethod = methodContext
    }

    public setReturnValue(value: DataType<any>) {
        this.callStack[this.callStack.length - 1].activeFrame.operandStack.push(value)
    }

    public getReturnType(): DataType<any> {
        return this.callStack[this.callStack.length - 1].returnType
    }

    public lengthOfCallStack(): number {
        return this.callStack.length
    }

    public getStaticField(name: string): DataType<any> | undefined {
        return this.staticFields.get(name)
    }

    public initialize(classFile: ClassFile): void {
        const runtimeConstantPool = new ConstantPool(classFile.data.header.constantPool)
        this.name = runtimeConstantPool.getClassName()

        classFile.data.fields.forEach(field => {
            if (field.data.accessFlags & FieldAccessFlags.ACC_STATIC) {
                const name = (runtimeConstantPool.get(field.data.nameIndex) as ConstantUtf8).data.bytes.toString()
                const descriptor = (runtimeConstantPool.get(field.data.descriptorIndex) as ConstantUtf8).data.bytes.toString()
                const type = this.getTypeFromDescriptor(descriptor)
                const value = new type(type as any)
                const constant = Runtime.getConstant((field.data.attributes.find(attribute => attribute instanceof AttributeConstantValue) as AttributeConstantValue).data.constantValueIndex).data as ConstantValueData
                value.set(constant.value)
                this.staticFields.set(name, value)
            }
        })

        classFile.data.methods.forEach(method => {
            const name = (runtimeConstantPool.get(method.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const descriptor = (runtimeConstantPool.get(method.data.descriptorIndex) as ConstantUtf8).data.bytes.toString()

            if (name === 'main') this.hasMainMethod = true

            const code = method.data.attributes.find(attribute => attribute instanceof AttributeCode) as AttributeCode
            const frame = new Frame(name, code.data.maxLocals, code.data.maxStack)
            const thisAddress = this.heap.allocate(this)
            const thisReference = new reference()
            thisReference.set(thisAddress)
            frame.setLocalVariable(new LocalVariable(thisReference), 0)
            const instructionStream = new InstructionStream(name, code.getCode())
            this.methods.push({
                name,
                activeFrame: frame,
                activeInstructionStream: instructionStream,
                returnType: this.getTypeFromDescriptor(descriptor)
            })
        })
        if (this.hasMainMethod) this.callFunction('main')
    }

    private getTypeFromDescriptor(descriptor: string): DescriptorType {
        const returnDescriptor = descriptor.split(')')[1]
        switch (returnDescriptor) {
            case 'B': return byte
            case 'C': return char
            case 'D': return double
            case 'F': return float
            case 'I': return int
            case 'J': return long
            case 'S': return short
            case 'Z': return int
        }
        if (returnDescriptor.startsWith('[')) {
            switch (returnDescriptor.substring(1)) {
                case 'B': return array<byte>
                case 'C': return array<char>
                case 'D': return array<double>
                case 'F': return array<float>
                case 'I': return array<int>
                case 'J': return array<long>
                case 'S': return array<short>
                case 'Z': return array<int>
            }
        }
        return classType
    }

}