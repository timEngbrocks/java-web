import { ConstantInterfaceMethodRef } from '../../../parser/types/constants/ConstantInterfaceMethodRef'
import { ConstantMethodRef } from '../../../parser/types/constants/ConstantMethodRef'
import { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { ReferenceType } from '../../data-types/data-type'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { getTypesFromMethodDescriptor } from '../../util/util'
import { ClassInstance } from '../../class/ClassInstance'
import { ConstantClass } from '../../../parser/types/constants/ConstantClass'

export class invokespecial extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: interfaces
	// FIXME: synchronized
	// FIXME: native methods
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = Runtime.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokespecial without constant method ref')
		const nameAndType = Runtime.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)
		const clazz = Runtime.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(Runtime.it().pop())
		parameters = parameters.reverse()
		const objectref = Runtime.it().pop() as ReferenceType
		const classInstance = Runtime.it().load(objectref) as ClassInstance
		if (className !== classInstance.getName()) {
			let superClass: ClassInstance | undefined = classInstance
			while (superClass) {
				superClass = superClass.getSuperClass()
				if (superClass && superClass.getName() === className) break
				else if (!superClass) throw new Error(`invokespecial: could not find super class ${className} of ${classInstance.getName()}`)
			}
			Runtime.it().setupFunctionCall(superClass, methodName, descriptor)
			superClass.setLocal(objectref, 0)
			let offset = 1
			for (let i = 0; i < parameters.length; i++) {
				superClass.setLocal(parameters[i], i + offset)
				if (parameters[i].isWide) offset++
			}
			Runtime.it().executeFunctionCall(superClass)
		} else {
			if (this.isAlreadyInSameInitAndWantsToCallAgain(classInstance, methodName, descriptor)) {
				return
			}
			Runtime.it().setupFunctionCall(classInstance, methodName, descriptor)
			classInstance.setLocal(objectref, 0)
			let offset = 1
			for (let i = 0; i < parameters.length; i++) {
				classInstance.setLocal(parameters[i], i + offset)
				if (parameters[i].isWide) offset++
			}
			Runtime.it().executeFunctionCall(classInstance)
		}
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = Runtime.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokespecial without constant method ref')
		const nameAndType = Runtime.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const clazz = Runtime.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `invokespecial @ '${className}.${methodName} ${descriptor}'`
	}

	private isAlreadyInSameInitAndWantsToCallAgain(classInstance: ClassInstance, methodName: string, descriptor: string): boolean {
		if (methodName !== '<init>') return false
		if (!classInstance.hasCurrentMethod()) return false
		return classInstance.currentMethod().instructionStream.getName() === '<init>' && classInstance.currentMethod().methodObject.descriptor === descriptor
	}
}
