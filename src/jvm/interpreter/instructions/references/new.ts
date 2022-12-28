import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { ClassObjectManager } from '../../class/ClassObjectManager'

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
		const clazz = Runtime.it().constant(index)
		if (!(clazz instanceof ConstantClass)) throw new Error('Tried new without ConstantClass')
		const name = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const classObject = ClassObjectManager.newInstance(name)
		if (!classObject) throw new Error(`new: Could not find class: ${name}`)
		classObject.getClass().initializeIfUninitialized()
		Runtime.it().push(Runtime.it().allocate(classObject))
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const clazz = Runtime.it().constant(index)
		if (!(clazz instanceof ConstantClass)) throw new Error('Tried new without ConstantClass')
		const name = (Runtime.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `new ${name}`
	}
}
