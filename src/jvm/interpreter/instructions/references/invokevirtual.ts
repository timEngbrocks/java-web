import { ConstantMethodRef } from '../../../class-loader/parser/types/constants/ConstantMethodRef'
import { ConstantNameAndType } from '../../../class-loader/parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../class-loader/parser/types/constants/ConstantUtf8'
import { ClassObject } from '../../ClassObject'
import { reference } from '../../data-types/references'
import { Instruction } from '../../Instruction'
import { HEAP_TYPES } from '../../memory/heap'
import { LocalVariable } from '../../memory/local-variable'
import { Runtime } from '../../Runtime'
import { getTypesFromMethodDescriptor } from '../../util'

export class invokevirtual extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: Signature polymorphic methods
	// FIXME: synchronized methods
	// FIXME: Native methods
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const methodRef = Runtime.getConstant(index)
		if (!(methodRef instanceof ConstantMethodRef)) throw 'Tried invokevirtual without constant method ref'
		const nameAndType = Runtime.getConstant(methodRef.data.nameAndTypeIndex) as ConstantNameAndType
		const methodName = (Runtime.getConstant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const descriptor = (Runtime.getConstant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const types = getTypesFromMethodDescriptor(descriptor)

		const objectref = Runtime.pop()
		if (!(objectref instanceof reference) || objectref.get()?.getType() != HEAP_TYPES.CLASS) throw 'Tried invokevirtual without objectref'
		const address = objectref.get()
		if (!address) throw 'invokevirtual null dereference'
		const classObject = Runtime.load(address) as ClassObject

		for (let i = 0; i < types.parameters.length; i++) classObject.setLocalVariable(new LocalVariable(Runtime.pop()), i + 1)

		Runtime.callFunctionOnObject(classObject, methodName)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		return `invokevirtual @ ${index}`
	}
}
