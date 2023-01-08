import { Instruction } from '../Instruction'

export class invokedynamic extends Instruction {
	override length = 5
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		// const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		// const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		// const index = (indexbyte1 << 8) | indexbyte2
		// const dynamicCallSite = Runtime.it().constant(index) as ConstantInvokeDynamic
		// const bootstrapMethod = Runtime.it().current().getBootstrapMethod(dynamicCallSite.data.bootstrapMethodAttrIndex)
		// const methodHandle = Runtime.it().constant(bootstrapMethod.bootstrapMethodRef) as ConstantMethodHandle
		// const nameAndType = Runtime.it().constant(dynamicCallSite.data.nameAndTypeIndex) as ConstantNameAndType
		// const name = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		// const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		// const referenceConstant = Runtime.it().constant(methodHandle.data.referenceIndex)
		// const methodTypeInstance = this.getMethodTypeInstance(methodHandle.data.referenceKind, referenceConstant)

		throw new Error('impl')
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		return `invokedynamic @ ${index}`
	}

	// private getMethodTypeInstance(kind: MethodHandleReferenceKind, referenceConstant: CPInfo<any>): ClassInstance {
	// 	let methodTypeDescriptor = ''
	// 	switch (kind) {
	// 		case MethodHandleReferenceKind.REF_getField: {
	// 			if (!(referenceConstant instanceof ConstantFieldRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const constantClass = Runtime.it().constant(referenceConstant.data.classIndex) as ConstantClass
	// 			const className = (Runtime.it().constant(constantClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			methodTypeDescriptor = `(${className})${descriptor}`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_getStatic: {
	// 			if (!(referenceConstant instanceof ConstantFieldRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			methodTypeDescriptor = `()${descriptor}`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_putField: {
	// 			if (!(referenceConstant instanceof ConstantFieldRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const constantClass = Runtime.it().constant(referenceConstant.data.classIndex) as ConstantClass
	// 			const className = (Runtime.it().constant(constantClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			methodTypeDescriptor = `(${className},${descriptor})V`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_putStatic: {
	// 			if (!(referenceConstant instanceof ConstantFieldRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			methodTypeDescriptor = `(${descriptor})V`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_invokeVirtual: {
	// 			if (!(referenceConstant instanceof ConstantMethodRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const constantClass = Runtime.it().constant(referenceConstant.data.classIndex) as ConstantClass
	// 			const className = (Runtime.it().constant(constantClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const argumentTypes = descriptor.split(')')[0].substring(1)
	// 			const returnType = descriptor.split(')')[1]
	// 			methodTypeDescriptor = `(${className},${argumentTypes})${returnType}`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_invokeStatic: {
	// 			if (!(referenceConstant instanceof ConstantMethodRef) && !(referenceConstant instanceof ConstantInterfaceMethodRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const argumentTypes = descriptor.split(')')[0].substring(1)
	// 			const returnType = descriptor.split(')')[1]
	// 			methodTypeDescriptor = `(${argumentTypes})${returnType}`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_invokeSpecial: {
	// 			if (!(referenceConstant instanceof ConstantMethodRef) && !(referenceConstant instanceof ConstantInterfaceMethodRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const constantClass = Runtime.it().constant(referenceConstant.data.classIndex) as ConstantClass
	// 			const className = (Runtime.it().constant(constantClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const argumentTypes = descriptor.split(')')[0].substring(1)
	// 			const returnType = descriptor.split(')')[1]
	// 			methodTypeDescriptor = `(${className},${argumentTypes})${returnType}`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_newInvokeSpecial: {
	// 			if (!(referenceConstant instanceof ConstantMethodRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const constantClass = Runtime.it().constant(referenceConstant.data.classIndex) as ConstantClass
	// 			const className = (Runtime.it().constant(constantClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const argumentTypes = descriptor.split(')')[0].substring(1)
	// 			methodTypeDescriptor = `(${argumentTypes})${className}`
	// 			break
	// 		}
	// 		case MethodHandleReferenceKind.REF_invokeInterface: {
	// 			if (!(referenceConstant instanceof ConstantInterfaceMethodRef)) throw new Error(`invokedynamic: Got kind: ${kind} but found: ${referenceConstant}`)
	// 			const constantClass = Runtime.it().constant(referenceConstant.data.classIndex) as ConstantClass
	// 			const className = (Runtime.it().constant(constantClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const nameAndType = Runtime.it().constant(referenceConstant.data.nameAndTypeIndex) as ConstantNameAndType
	// 			const descriptor = (Runtime.it().constant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	// 			const argumentTypes = descriptor.split(')')[0].substring(1)
	// 			const returnType = descriptor.split(')')[1]
	// 			methodTypeDescriptor = `(${className},${argumentTypes})${returnType}`
	// 		}
	// 	}
	// 	const methodTypeClassObject = ClassObjectManager.getClass('java/lang/invoke/MethodType')
	// 	const rtype = methodTypeDescriptor.split(')')[1]
	// 	const rtypeClass = ClassObjectManager.getAssociatedClassObject(rtype.substring(1, rtype.length - 1))
	// 	const ptypes = methodTypeDescriptor.split(')')[0].substring(1).split(';').slice(0, -1)
	// 	if (getTypesFromMethodDescriptor(methodTypeDescriptor).parameters.length !== ptypes.length) throw new Error(`FIXME: invokedynamic ptypes ${methodTypeDescriptor}`)
	// 	const ptypesClasses = map(ptypes, ptype => ClassObjectManager.getAssociatedClassObject(ptype.substring(1)))
	// 	const ptypesArray = new ArrayType(new ReferenceType())
	// 	ptypesArray.set(ptypesClasses)
	// 	const ptypesArrayReference = Runtime.it().allocate(ptypesArray)
	// 	Runtime.it().setupExecuteOutOfOrderWithReturn()
	// 	Runtime.it().setupFunctionCall(methodTypeClassObject, 'makeImpl', '(Ljava/lang/Class;[Ljava/lang/Class;Z)Ljava/lang/invoke/MethodType;')
	// 	methodTypeClassObject.setLocal(rtypeClass, 0)
	// 	methodTypeClassObject.setLocal(ptypesArrayReference, 1)
	// 	methodTypeClassObject.setLocal(new int(0), 2)
	// 	Runtime.it().executeFunctionCall(methodTypeClassObject)
	// 	const classStack = Runtime.it().callExecuteOutOfOrder()
	// 	const methodTypeInstanceReference = (classStack.current().pop() as ReferenceType)
	// 	const methodTypeInstance = Runtime.it().load(methodTypeInstanceReference) as ClassInstance
	// 	return methodTypeInstance
	// }
}
