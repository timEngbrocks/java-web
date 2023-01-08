import type { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { ClassInstance } from '../../class/ClassInstance'
import type { ReferenceType } from '../../data-types/ReferenceType'
import { int } from '../../data-types/int'
import { Instruction } from '../Instruction'
import { RuntimeManager } from '../../manager/RuntimeManager'

export class Instanceof extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: implements interface
	// FIXME: arrays
	public override execute(): void {
		const objectRef = RuntimeManager.it().pop() as ReferenceType
		if (!objectRef.get().address) {
			RuntimeManager.it().push(new int(0))
			return
		}
		const object = RuntimeManager.it().load(objectRef)
		if (!(object instanceof ClassInstance)) throw new Error('instanceof: TODO')
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const classObject = RuntimeManager.it().constant(index) as ConstantClass
		const name = (RuntimeManager.it().constant(classObject.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		if (!name.startsWith('[')) {
			if (name === object.getName()) RuntimeManager.it().push(new int(1))
			else RuntimeManager.it().push(new int(0))
		} else {
			throw new Error('instanceof: TODO array')
		}
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const classObject = RuntimeManager.it().constant(index) as ConstantClass
		const name = (RuntimeManager.it().constant(classObject.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `instanceof -> ${name}`
	}
}
