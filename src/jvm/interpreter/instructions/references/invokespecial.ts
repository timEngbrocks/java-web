import { ConstantInterfaceMethodRef } from '../../../parser/types/constants/ConstantInterfaceMethodRef'
import { ConstantMethodRef } from '../../../parser/types/constants/ConstantMethodRef'
import { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { ReferenceType } from '../../data-types/data-type'
import { Instruction } from '../Instruction'
import { HEAP_TYPES } from '../../memory/heap'
import { Runtime } from '../../Runtime'
import { getTypesFromMethodDescriptor } from '../../util/util'
import { ClassInstance } from '../../class/ClassInstance'

export class invokespecial extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: super classes
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
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(Runtime.it().pop())
		parameters = parameters.reverse()
		const objectref = Runtime.it().pop()
		if (!(objectref instanceof ReferenceType) || objectref.get()?.getType() !== HEAP_TYPES.CLASS) throw new Error('Tried invokespecial without objectref')
		const address = objectref.get()
		if (!address) throw new Error('invokespecial null dereference')
		const classInstance = Runtime.it().load(address) as ClassInstance
		if (this.isAlreadyInSameInitAndWantsToCallAgain(classInstance, methodName, descriptor)) {
			return
		}
		Runtime.it().setupFunctionCall(classInstance, methodName, descriptor)
		classInstance.setLocal(objectref, 0)
		for (let i = 1; i <= parameters.length; i++) classInstance.setLocal(parameters[i - 1], i)
		Runtime.it().executeFunctionCall(classInstance)
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
		return `invokespecial @ '${methodName} ${descriptor}'`
	}

	private isAlreadyInSameInitAndWantsToCallAgain(classInstance: ClassInstance, methodName: string, descriptor: string): boolean {
		if (methodName !== '<init>') return false
		if (!classInstance.hasCurrentMethod()) return false
		return classInstance.currentMethod().instructionStream.getName() === '<init>' && classInstance.currentMethod().methodObject.descriptor === descriptor
	}
}
