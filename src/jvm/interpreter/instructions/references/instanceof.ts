import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { ClassInstance } from '../../class/ClassInstance'
import { ReferenceType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { Runtime } from '../../Runtime'
import { Instruction } from '../Instruction'

export class Instanceof extends Instruction {
	length = 3
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: implements interface
	// FIXME: arrays
	public override execute(): void {
		const objectRef = Runtime.it().pop() as ReferenceType
		if (!objectRef.get().address) {
			Runtime.it().push(new int(0))
			return
		}
		const object = Runtime.it().load(objectRef)
		if (!(object instanceof ClassInstance)) throw new Error('instanceof: TODO')
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const classObject = Runtime.it().constant(index) as ConstantClass
		const name = (Runtime.it().constant(classObject.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		if (!name.startsWith('[')) {
			if (name === object.getName()) Runtime.it().push(new int(1))
			else Runtime.it().push(new int(0))
		} else {
			throw new Error('instanceof: TODO array')
		}
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const classObject = Runtime.it().constant(index) as ConstantClass
		const name = (Runtime.it().constant(classObject.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `instanceof -> ${name}`
	}
}
