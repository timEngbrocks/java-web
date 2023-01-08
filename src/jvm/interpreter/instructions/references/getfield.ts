import { ConstantFieldRef } from '../../../parser/types/constants/ConstantFieldRef'
import type { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { Instruction } from '../Instruction'
import type { ReferenceType } from '../../data-types/ReferenceType'
import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import type { ClassInstance } from '../../class/ClassInstance'
import { RuntimeManager } from '../../manager/RuntimeManager'

export class getfield extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const fieldRef = RuntimeManager.it().constant(index)
		if (!(fieldRef instanceof ConstantFieldRef)) throw new Error('Tried getfield without constant field ref')
		const nameAndType = RuntimeManager.it().constant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const objectref = RuntimeManager.it().pop() as ReferenceType
		const classObject = RuntimeManager.it().load(objectref) as ClassInstance
		const value = classObject.getField(fieldName)
		if (!value) throw new Error(`getfield could not find field: ${classObject.getName()} -> ${fieldName}`)
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const fieldRef = RuntimeManager.it().constant(index)
		if (!(fieldRef instanceof ConstantFieldRef)) throw new Error('Tried getfield without constant field ref')
		const clazz = RuntimeManager.it().constant(fieldRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const nameAndType = RuntimeManager.it().constant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `getfield ${className}.${fieldName}`
	}
}
