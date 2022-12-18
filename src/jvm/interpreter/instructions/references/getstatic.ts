import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantFieldRef } from '../../../parser/types/constants/ConstantFieldRef'
import { ConstantNameAndType } from '../../../parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class getstatic extends Instruction {
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
		if (!(fieldRef instanceof ConstantFieldRef)) throw new Error('Tried getstatic without constant field ref')
		const clazz = Runtime.it().constant(fieldRef.data.classIndex) as ConstantClass
		const className = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const nameAndType = Runtime.it().constant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (Runtime.it().constant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const value = Runtime.it().getStatic(className, fieldName)
		if (!value) throw new Error(`getstatic could not find field: ${className} -> ${fieldName}`)
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
		return `getstatic ${className}.${fieldName}`
	}
}
