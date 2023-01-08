import { ConstantInterfaceMethodRef } from '../../../parser/types/constants/ConstantInterfaceMethodRef'
import { ConstantMethodRef } from '../../../parser/types/constants/ConstantMethodRef'
import type { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import type { ReferenceType } from '../../data-types/ReferenceType'
import { Instruction } from '../Instruction'
import { getTypesFromMethodDescriptor } from '../../util/util'
import type { ClassInstance } from '../../class/ClassInstance'
import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { ExecutionManager } from '../../manager/ExecutionManager'

export class invokespecial extends Instruction {
	override length = 3
	override args = ''
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
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokespecial without constant method ref')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)
		const clazz = RuntimeManager.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(RuntimeManager.it().pop())
		parameters = parameters.reverse()
		const objectref = RuntimeManager.it().pop() as ReferenceType
		const classInstance = RuntimeManager.it().load(objectref) as ClassInstance
		if (className !== classInstance.getName()) {
			let superClass: ClassInstance | undefined = classInstance
			while (superClass) {
				superClass = superClass.getSuperClass()
				if (superClass && superClass.getName() === className) break
				else if (!superClass) throw new Error(`invokespecial: could not find super class ${className} of ${classInstance.getName()}`)
			}
			ExecutionManager.it().setupFunctionCall(superClass, methodName, descriptor)
			superClass.setLocal(objectref, 0)
			let offset = 1
			for (let i = 0; i < parameters.length; i++) {
				superClass.setLocal(parameters[i], i + offset)
				if (parameters[i].isWide) offset++
			}
			ExecutionManager.it().executeFunctionCall(superClass)
		} else {
			if (this.isAlreadyInSameInitAndWantsToCallAgain(classInstance, methodName, descriptor)) {
				return
			}
			ExecutionManager.it().setupFunctionCall(classInstance, methodName, descriptor)
			classInstance.setLocal(objectref, 0)
			let offset = 1
			for (let i = 0; i < parameters.length; i++) {
				classInstance.setLocal(parameters[i], i + offset)
				if (parameters[i].isWide) offset++
			}
			ExecutionManager.it().executeFunctionCall(classInstance)
		}
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokespecial without constant method ref')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const clazz = RuntimeManager.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `invokespecial @ '${className}.${methodName} ${descriptor}'`
	}

	private isAlreadyInSameInitAndWantsToCallAgain(classInstance: ClassInstance, methodName: string, descriptor: string): boolean {
		if (methodName !== '<init>') return false
		if (!classInstance.hasCurrentMethod()) return false
		return classInstance.currentMethod().instructionStream.getName() === '<init>' && classInstance.currentMethod().methodObject.descriptor === descriptor
	}
}
