import { ConstantMethodRef } from '../../../parser/types/constants/ConstantMethodRef'
import type { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import type { ReferenceType } from '../../data-types/ReferenceType'
import { Instruction } from '../Instruction'
import { getTypesFromMethodDescriptor } from '../../util/util'
import { ClassInstance } from '../../class/ClassInstance'
import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { ExecutionManager } from '../../manager/ExecutionManager'
import { ArrayType } from '../../data-types/ArrayType'
import { ClassManager } from '../../manager/ClassManager'

export class invokevirtual extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: Signature polymorphic methods
	// FIXME: synchronized methods
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokevirtual without constant method ref')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(RuntimeManager.it().pop())
		parameters = parameters.reverse()
		const objectref = RuntimeManager.it().pop() as ReferenceType
		const object = RuntimeManager.it().load(objectref)
		if (object instanceof ArrayType) {
			const objectInstance = ClassManager.it().newInstance('java/lang/Object')
			ExecutionManager.it().setupFunctionCall(objectInstance, methodName, descriptor)
			objectInstance.setLocal(objectref, 0)
			let offset = 1
			for (let i = 0; i < parameters.length; i++) {
				objectInstance.setLocal(parameters[i], i + offset)
				if (parameters[i].isWide) offset++
			}
			ExecutionManager.it().executeFunctionCall(objectInstance)
		} else if (object instanceof ClassInstance) {
			ExecutionManager.it().setupFunctionCall(object, methodName, descriptor)
			object.setLocal(objectref, 0)
			let offset = 1
			for (let i = 0; i < parameters.length; i++) {
				object.setLocal(parameters[i], i + offset)
				if (parameters[i].isWide) offset++
			}
			ExecutionManager.it().executeFunctionCall(object)
		} else throw new Error(`invokevirtual: object is neither array nor instance ${JSON.stringify(object)}`)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokevirtual without constant method ref')
		const clazz = RuntimeManager.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `invokevirtual @ '${className}.${methodName} ${descriptor}'`
	}
}
