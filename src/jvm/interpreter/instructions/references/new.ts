import { ConstantClass } from '../../../class-loader/parser/types/constants/ConstantClass'
import { ConstantUtf8 } from '../../../class-loader/parser/types/constants/ConstantUtf8'
import { reference } from '../../data-types/references'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

export class New extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: new array
	// FIXME: access control
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const clazz = Runtime.getConstant(index)
		if (!(clazz instanceof ConstantClass)) throw 'Tried new without ConstantClass'
		const name = (Runtime.getConstant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const classObject = Runtime.getClass(name)
		if (!classObject) throw `new: Could not find class: ${name}`
		const address = Runtime.allocate(classObject)
		const ref = new reference()
		ref.set(address)
		Runtime.push(ref)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		return `new @ ${index}`
	}
}
