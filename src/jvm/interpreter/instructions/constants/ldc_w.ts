import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import { ConstantFloat } from '../../../parser/types/constants/ConstantFloat'
import { ConstantInteger } from '../../../parser/types/constants/ConstantInteger'
import { ConstantString } from '../../../parser/types/constants/ConstantString'
import { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { byte } from '../../data-types/byte'
import { ArrayType, ReferenceType } from '../../data-types/data-type'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'
import { ClassObjectManager } from '../../class/ClassObjectManager'

export class ldc_w extends Instruction {
	opcode: number = OpCodes.ldc
	length: number = 3
	args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const value = Runtime.it().constant(index)
		if (value instanceof ConstantInteger) {
			const x = new int()
			x.set(value.data.value)
			Runtime.it().push(x)
			return
		}
		if (value instanceof ConstantFloat) {
			const x = new float()
			x.set(value.data.value)
			Runtime.it().push(x)
			return
		}
		if (value instanceof ConstantString) {
			const rawStringData = (Runtime.it().constant(value.data.stringIndex) as ConstantUtf8).data.bytes.toString()
			// FIXME: this probably shouldn't use \0
			const stringData = rawStringData.replace(',,,', ',\0,').split(',').join('').replace('\0', ',')
			const stringClass = ClassObjectManager.newInstance('java/lang/String')
			if (!stringClass) throw new Error('ldc could not find java/lang/String')
			const stringValue = new ArrayType(new byte())
			for (let i = 0; i < stringData.length; i++) {
				const address = Runtime.it().allocate(new byte(stringData.charCodeAt(i)))
				stringValue.get().push(new ReferenceType(address))
			}
			const stringAddress = Runtime.it().allocate(stringValue)
			stringClass.putField('value', new ReferenceType(stringAddress))
			const address = Runtime.it().allocate(stringClass)
			Runtime.it().push(new ReferenceType(address, stringClass.getName()))
			return
		}
		if (value instanceof ConstantClass) {
			const className = (Runtime.it().constant(value.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const classReference = ClassObjectManager.getAssociatedClassObject(className)
			Runtime.it().push(classReference)
			return
		}
		throw new Error(`Unimplemented case for ldc_w value: ${value.toString()}`)
	}

	public override toString(): string {
		return `ldc_w 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}
}
