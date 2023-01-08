import { ConstantInterfaceMethodRef } from '../../../parser/types/constants/ConstantInterfaceMethodRef'
import type { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import type { ReferenceType } from '../../data-types/ReferenceType'
import { Instruction } from '../Instruction'
import { getTypesFromMethodDescriptor } from '../../util/util'
import type { ClassInstance } from '../../class/ClassInstance'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { ExecutionManager } from '../../manager/ExecutionManager'

export class invokeinterface extends Instruction {
	override length = 5
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: synchronized
	// FIXME: native methods
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef)) throw new Error('Tried invokeinterface without constant interface method ref')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(RuntimeManager.it().pop())
		parameters = parameters.reverse()
		const objectref = RuntimeManager.it().pop() as ReferenceType
		const classInstance = RuntimeManager.it().load(objectref) as ClassInstance
		ExecutionManager.it().setupFunctionCall(classInstance, methodName, descriptor)
		classInstance.setLocal(objectref, 0)
		let offset = 1
		for (let i = 0; i < parameters.length; i++) {
			classInstance.setLocal(parameters[i], i + offset)
			if (parameters[i].isWide) offset++
		}
		ExecutionManager.it().executeFunctionCall(classInstance)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const count = Number.parseInt(this.args.substring(4, 6), 16)
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef)) throw new Error('Tried invokeinterface without constant interface method ref')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `invokeinterface @ '${methodName} ${descriptor}', ${count}`
	}
}
