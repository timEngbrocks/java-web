import { cloneDeep } from 'lodash'
import { AttributeBootstrapMethodsBootstrapMethod } from '../class-loader/parser/types/attributes/AttributeBootstrapMethods'
import { ConstantData } from '../class-loader/parser/types/constants/ConstantData'
import { CPInfo } from '../class-loader/parser/types/CPInfo'
import { ClassObject } from './ClassObject'
import { DataType } from './data-types/data-type'
import { HeapAddress, HeapData } from './memory/heap'
import { LocalVariable } from './memory/local-variable'

export class Runtime {
	public static classObject: ClassObject
	public static classes: ClassObject[] = []
	public static classStack: ClassObject[] = []

	public static reset(): void {
		this.classObject = new ClassObject()
		this.classes = []
		this.classStack = []
	}

	public static set(classObject: ClassObject, classes: ClassObject[]): void {
		this.classObject = classObject
		this.classes = classes
	}

	public static getConstant(index: number): CPInfo<ConstantData> {
		return this.classObject.getConstant(index)
	}

	public static allocate(value: any): HeapAddress {
		return this.classObject.allocate(value)
	}

	public static load(address: HeapAddress): HeapData {
		return this.classObject.load(address)
	}

	public static push(value: DataType<any>): void {
		this.classObject.push(value)
	}

	public static pop(): DataType<any> {
		return this.classObject.pop()
	}

	public static peek(): DataType<any> {
		return this.classObject.peek()
	}

	public static setLocalVariable(variable: LocalVariable, index: number): void {
		this.classObject.setLocalVariable(variable, index)
	}

	public static getLocalVariable(index: number): LocalVariable {
		return this.classObject.getLocalVariable(index)
	}

	public static jumpByOffset(offset: number): void {
		this.classObject.jumpByOffset(offset)
	}

	public static getPC(): number {
		return this.classObject.currentMethod.activeInstructionStream.getPC()
	}

	public static setPC(pc: number): void {
		this.classObject.currentMethod.activeInstructionStream.setPC(pc)
	}

	public static callFunction(className: string, functionName: string): void {
		this.classStack.push(this.classObject)
		if (className == this.classObject.name) {
			this.classObject.callFunction(functionName)
		} else {
			const newClassObject = cloneDeep(this.classes.find(clazz => clazz.name == className))
			if (!newClassObject) throw `Could not find class: ${className}`
			this.classObject = newClassObject
			this.classObject.callFunction(functionName)
		}
	}

	public static callFunctionOnObject(classObject: ClassObject, functionName: string): void {
		this.classStack.push(this.classObject)
		this.classObject = classObject
		this.classObject.callFunction(functionName)
	}

	public static setReturnValue(value: DataType<any>): void {
		this.classStack[this.classStack.length - 1].setReturnValue(value)
	}

	public static returnFromFunction(): void {
		this.classObject.returnFromFunction()
		if (this.classObject.lengthOfCallStack() == 0) {
			const newClassObject = this.classStack.pop()
			if (!newClassObject) throw 'Empty class stack'
			this.classObject = newClassObject
		}
	}

	public static getStaticField(className: string, fieldName: string): DataType<any> | undefined {
		return this.classes.find(clazz => clazz.name == className)?.getStaticField(fieldName)
	}

	public static putStaticField(className: string, fieldName: string, value: DataType<any>): void {
		return this.classes.find(clazz => clazz.name == className)?.putStaticField(fieldName, value)
	}

	public static getBootstrapMethod(index: number): AttributeBootstrapMethodsBootstrapMethod {
		return this.classObject.getBootstrapMethod(index)
	}
}
