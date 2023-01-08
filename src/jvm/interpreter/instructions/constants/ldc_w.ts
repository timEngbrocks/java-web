import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantFloat } from '../../../parser/types/constants/ConstantFloat'
import { ConstantInteger } from '../../../parser/types/constants/ConstantInteger'
import { ConstantString } from '../../../parser/types/constants/ConstantString'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { byte } from '../../data-types/byte'
import { ArrayType } from '../../data-types/ArrayType'
import { Instruction } from '../Instruction'
import { ConstantLong } from '../../../parser/types/constants/ConstantLong'
import { long } from '../../data-types/long'
import { ConstantDouble } from '../../../parser/types/constants/ConstantDouble'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { ClassManager } from '../../manager/ClassManager'

export class ldc_w extends Instruction {
	override length: number = 3
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const value = RuntimeManager.it().constant(index)
		if (value instanceof ConstantLong) {
			const x = new long()
			x.set(value.data.value)
			RuntimeManager.it().push(x)
			return
		}
		if (value instanceof ConstantDouble) {
			const x = new double()
			x.set(value.data.value)
			RuntimeManager.it().push(x)
			return
		}
		if (value instanceof ConstantInteger) {
			const x = new int()
			x.set(value.data.value)
			RuntimeManager.it().push(x)
			return
		}
		if (value instanceof ConstantFloat) {
			const x = new float()
			x.set(value.data.value)
			RuntimeManager.it().push(x)
			return
		}
		if (value instanceof ConstantString) {
			const rawStringData = (RuntimeManager.it().constant(value.data.stringIndex) as ConstantUtf8).data.bytes.toString()
			// FIXME: this probably shouldn't use \0
			const stringData = rawStringData.replace(',,,', ',\0,').split(',').join('').replace('\0', ',')
			const stringClass = ClassManager.it().newInstance('java/lang/String')
			if (!stringClass) throw new Error('ldc could not find java/lang/String')
			const stringValue = new ArrayType(new byte())
			for (let i = 0; i < stringData.length; i++) {
				stringValue.get().push(RuntimeManager.it().allocate(new byte(stringData.charCodeAt(i))))
			}
			stringClass.putField('value', RuntimeManager.it().allocate(stringValue))
			RuntimeManager.it().push(RuntimeManager.it().allocate(stringClass))
			return
		}
		if (value instanceof ConstantClass) {
			const className = (RuntimeManager.it().constant(value.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const classReference = ClassManager.it().getAssociatedClassObject(className)
			RuntimeManager.it().push(classReference)
			return
		}
		throw new Error(`Unimplemented case for ldc_w value: ${value.toString()}`)
	}

	public override toString(): string {
		return `ldc_w 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}
}
