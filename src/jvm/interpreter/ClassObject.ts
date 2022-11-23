import { FieldAccessFlags } from "../class-loader/parser/FieldInfoParser"
import { AttributeCode } from "../class-loader/parser/types/attributes/AttributeCode"
import { AttributeConstantValue } from "../class-loader/parser/types/attributes/AttributeConstantValue"
import { ClassFile } from "../class-loader/parser/types/ClassFile"
import { ConstantUtf8 } from "../class-loader/parser/types/constants/ConstantUtf8"
import { ConstantValueData } from "../class-loader/parser/types/constants/ConstantValueData"
import { CPInfo } from "../class-loader/parser/types/CPInfo"
import { DataType, DescriptorType, VoidType } from "./data-types/data-type"
import { reference } from "./data-types/references"
import { Void } from "./data-types/void"
import { InstructionStream } from "./InstructionStream"
import { ConstantPool } from "./memory/constant-pool"
import { Frame } from "./memory/frame"
import { Heap, HeapAddress, HeapData } from "./memory/heap"
import { LocalVariable } from "./memory/local-variable"
import { Runtime } from "./Runtime"
import { getTypeFromFieldDescriptor, getTypesFromMethodDescriptor } from "./util"

export interface MethodTypes {
    parameters: DescriptorType[]
    returnType: DescriptorType | VoidType
}
export interface MethodContext {
    name: string
    activeFrame: Frame
    activeInstructionStream: InstructionStream
    types: MethodTypes
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
        types: {
            parameters: [],
            returnType: new Void()
        }
    }
    public staticFields: Map<string, DataType<any>> = new Map()
    public fields: Map<string, DataType<any>> = new Map()

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
        this.currentMethod.activeInstructionStream.setPC(0)
    }

    public returnFromFunction(): void {
        const methodContext = this.callStack.pop()
        if (!methodContext) return
        this.currentMethod = methodContext
    }

    public setReturnValue(value: DataType<any>) {
        this.callStack[this.callStack.length - 1].activeFrame.operandStack.push(value)
    }

    public getReturnType(): DescriptorType | VoidType {
        return this.callStack[this.callStack.length - 1].types.returnType
    }

    public lengthOfCallStack(): number {
        return this.callStack.length
    }

    public getStaticField(name: string): DataType<any> | undefined {
        return this.staticFields.get(name)
    }

    public putStaticField(name: string, value: DataType<any>): void {
        this.staticFields.set(name, value)
    }

    public getField(name: string): DataType<any> | undefined {
        return this.fields.get(name)
    }

    public putField(name: string, value: DataType<any>): void {
        this.fields.set(name, value)
    }

    public initialize(classFile: ClassFile): void {
        const runtimeConstantPool = new ConstantPool(classFile.data.header.constantPool)
        this.name = runtimeConstantPool.getClassName()

        classFile.data.fields.forEach(field => {
            const name = (runtimeConstantPool.get(field.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const descriptor = (runtimeConstantPool.get(field.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const type = getTypeFromFieldDescriptor(descriptor)
            if (!type) throw `Could not read field descriptor for: ${this.name} -> ${name}`
            const value = new type(type as any)
            const constant = Runtime.getConstant((field.data.attributes.find(attribute => attribute instanceof AttributeConstantValue) as AttributeConstantValue).data.constantValueIndex).data as ConstantValueData
            value.set(constant.value)
            if (field.data.accessFlags & FieldAccessFlags.ACC_STATIC) {
                this.staticFields.set(name, value)
            } else {
                this.fields.set(name, value)
            }
        })

        classFile.data.methods.forEach(method => {
            const name = (runtimeConstantPool.get(method.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
            const descriptor = (runtimeConstantPool.get(method.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

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
                types: getTypesFromMethodDescriptor(descriptor)
            })
        })
        if (this.hasMainMethod) this.callFunction('main')
    }

}