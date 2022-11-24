import { ConstantFieldRef } from '../../../class-loader/parser/types/constants/ConstantFieldRef'
import { ConstantNameAndType } from '../../../class-loader/parser/types/constants/ConstantNameAndType'
import { ConstantUtf8 } from '../../../class-loader/parser/types/constants/ConstantUtf8'
import { ClassObject } from '../../ClassObject'
import { reference } from '../../data-types/references'
import { Instruction } from '../../Instruction'
import { HEAP_TYPES } from '../../memory/heap'
import { Runtime } from '../../Runtime'

export class putfield extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const fieldRef = Runtime.getConstant(index)
		if (!(fieldRef instanceof ConstantFieldRef)) throw 'Tried getfield without constant field ref'
		const nameAndType = Runtime.getConstant(fieldRef.data.nameAndTypeIndex) as ConstantNameAndType
		const fieldName = (Runtime.getConstant(nameAndType.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		const value = Runtime.pop()

		const objectref = Runtime.pop()
		if (!(objectref instanceof reference) || objectref.get()?.getType() != HEAP_TYPES.CLASS) throw 'Tried getfield without objectref'
		const address = objectref.get()
		if (!address) throw 'getfield null dereference'
		const classObject = Runtime.load(address) as ClassObject
		classObject.putField(fieldName, value)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		return `putfield @ ${index}`
	}
}
