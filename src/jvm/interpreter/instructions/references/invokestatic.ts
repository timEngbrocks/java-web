import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantInterfaceMethodRef } from '../../../parser/types/constants/ConstantInterfaceMethodRef'
import { ConstantMethodRef } from '../../../parser/types/constants/ConstantMethodRef'
import { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { getTypesFromMethodDescriptor } from '../../util/util'
import { ClassObjectManager } from '../../class/ClassObjectManager'
import { ExecutableInterface } from '../../class/ExecutableInterface'

export class invokestatic extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: synchronized
	// FIXME: native methods
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = Runtime.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokestatic without constant method ref')
		const clazz = Runtime.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = Runtime.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)
		let parameters = []
		for (let i = 0; i < types.parameters.length; i++) parameters.push(Runtime.it().pop())
		parameters = parameters.reverse()
		let executableObject: ExecutableInterface | undefined
		if (ClassObjectManager.isClass(className)) {
			const classObject = ClassObjectManager.getClass(className)
			classObject.initializeIfUninitialized()
			executableObject = classObject
		} else if (ClassObjectManager.isInterface(className)) {
			executableObject = ClassObjectManager.getInterface(className)
		}
		if (!executableObject) throw new Error(`invokestatic: ${className} is neither class nor interface`)
		Runtime.it().setupFunctionCall(executableObject, methodName, descriptor)
		let offset = 0
		for (let i = 0; i < parameters.length; i++) {
			executableObject.setLocal(parameters[i], i + offset)
			if (parameters[i].isWide) offset++
		}
		Runtime.it().executeFunctionCall(executableObject)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = Runtime.it().constant(index)
		if (!(methodRef instanceof ConstantInterfaceMethodRef || methodRef instanceof ConstantMethodRef)) throw new Error('Tried invokestatic without constant method ref')
		const clazz = Runtime.it().constant(methodRef.data.classIndex) as ConstantClass
		const className = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = Runtime.it().constant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `invokestatic @ ${className} -> '${methodName} ${descriptor}'`
	}
}
