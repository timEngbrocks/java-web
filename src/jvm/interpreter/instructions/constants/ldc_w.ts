import { ConstantFloat } from '../../../class-loader/parser/types/constants/ConstantFloat'
import { ConstantInteger } from '../../../class-loader/parser/types/constants/ConstantInteger'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'
import { OpCodes } from '../opcodes'

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
		const value = Runtime.getConstant(index)
		if (value instanceof ConstantInteger) {
			const x = new int()
			x.set(value.data.value)
			Runtime.push(x)
			return
		}
		if (value instanceof ConstantFloat) {
			const x = new float()
			x.set(value.data.value)
			Runtime.push(x)
			return
		}
		throw `Unimplemented case for ldc_w value: ${value.toString()}`
	}

	public override toString(): string {
		return `ldc_w 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}
}
