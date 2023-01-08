import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { ClassManager } from '../../manager/ClassManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class New extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: new array
	// FIXME: access control
	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const clazz = RuntimeManager.it().constant(index)
		if (!(clazz instanceof ConstantClass)) throw new Error('Tried new without ConstantClass')
		const name = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		const classObject = ClassManager.it().newInstance(name)
		if (!classObject) throw new Error(`new: Could not find class: ${name}`)
		RuntimeManager.it().push(RuntimeManager.it().allocate(classObject))
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const clazz = RuntimeManager.it().constant(index)
		if (!(clazz instanceof ConstantClass)) throw new Error('Tried new without ConstantClass')
		const name = (RuntimeManager.it().constant(clazz.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `new ${name}`
	}
}
