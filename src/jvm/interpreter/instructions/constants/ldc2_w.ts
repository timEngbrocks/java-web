import { ConstantDouble } from '../../../parser/types/constants/ConstantDouble'
import { ConstantLong } from '../../../parser/types/constants/ConstantLong'
import { double } from '../../data-types/double'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class ldc2_w extends Instruction {
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
		if (value instanceof ConstantDouble) {
			const x = new double()
			x.set(value.data.value)
			RuntimeManager.it().push(x)
		} else if (value instanceof ConstantLong) {
			const x = new long()
			x.set(value.data.value)
			RuntimeManager.it().push(x)
		} else throw new Error(`Unimplemented case for ldc2_w value: ${value.toString()}`)
	}

	public override toString(): string {
		return `ldc2_w 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}
}
