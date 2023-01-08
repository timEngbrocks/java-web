import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantInterfaceMethodRef } from '../../../parser/types/constants/ConstantInterfaceMethodRef'
import { ConstantMethodRef } from '../../../parser/types/constants/ConstantMethodRef'
import type { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { Instruction } from '../Instruction'
import { getTypesFromMethodDescriptor } from '../../util/util'
import type { ExecutableInterface } from '../../class/ExecutableInterface'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { ClassManager } from '../../manager/ClassManager'
import { ExecutionManager } from '../../manager/ExecutionManager'

export class invokestatic extends Instruction {
	override length = 3
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
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokestatic without constant method ref')
		const clazz = RuntimeManager.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(RuntimeManager.it().pop())
		parameters = parameters.reverse()
		let executableObject: ExecutableInterface | undefined
		if (ClassManager.it().isClass(className)) {
			const classObject = ClassManager.it().getClass(className)
			classObject.initializeIfUninitialized()
			executableObject = classObject
		} else if (ClassManager.it().isInterface(className)) {
			executableObject = ClassManager.it().getInterface(className)
		}
		if (!executableObject) throw new Error(`invokestatic: ${className} is neither class nor interface`)
		ExecutionManager.it().setupFunctionCall(executableObject, methodName, descriptor)
		let offset = 0
		for (let i = 0; i < parameters.length; i++) {
			executableObject.setLocal(parameters[i], i + offset)
			if (parameters[i].isWide) offset++
		}
		ExecutionManager.it().executeFunctionCall(executableObject)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = RuntimeManager.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokestatic without constant method ref')
		const clazz = RuntimeManager.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = RuntimeManager.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (RuntimeManager.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `invokestatic @ ${className} -> '${methodName} ${descriptor}'`
	}
}
