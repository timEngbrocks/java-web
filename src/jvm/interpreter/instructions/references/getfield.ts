import { ConstantFieldRef } from '../../../parser/types/constants/ConstantFieldRef'
import { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { HEAP_TYPES } from '../../memory/heap'
import { ClassObject } from '../../class/ClassObject'
import { ReferenceType } from '../../data-types/data-type'
import { ConstantClass } from '../../../parser/types/constants/ConstantClass'

export class getfield extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const fieldRef = Runtime.it().constant(index)
		if (!(fieldRef instanceof ConstantFieldRef)) throw new Error('Tried getfield without constant field ref')
		const nameAndType = Runtime.it().constant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const objectref = Runtime.it().pop()
		if (!(objectref instanceof ReferenceType) || objectref.get()?.getType() != HEAP_TYPES.CLASS) throw new Error('Tried getfield without objectref')
		const address = objectref.get()
		if (!address) throw new Error('getfield null dereference')
		const classObject = Runtime.it().load(address) as ClassObject

		const value = classObject.getField(fieldName)
		if (!value) throw new Error(`getfield could not find field: ${classObject.getName()} -> ${fieldName}`)
		Runtime.it().push(value)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const fieldRef = Runtime.it().constant(index)
		if (!(fieldRef instanceof ConstantFieldRef)) throw new Error('Tried getfield without constant field ref')
		const clazz = Runtime.it().constant(fieldRef.data.classIndex) as ConstantClass
		const className = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = Runtime.it().constant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `getfield ${className}.${fieldName}`
	}
}
