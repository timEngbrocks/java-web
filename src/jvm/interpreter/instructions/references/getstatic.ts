import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantFieldRef } from '../../../parser/types/constants/ConstantFieldRef'
import type { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class getstatic extends Instruction {
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
		if (!(fieldRef instanceof ConstantFieldRef)) throw new Error('Tried getstatic without constant field ref')
		const clazz = RuntimeManager.it().constant(fieldRef.data.classIndex) as ConstantClass
		const className = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const nameAndType = RuntimeManager.it().constant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (RuntimeManager.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const value = RuntimeManager.it().getStatic(className, fieldName)
		if (!value) throw new Error(`getstatic could not find field: ${className} -> ${fieldName}`)
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
		return `getstatic ${className}.${fieldName}`
	}
}
