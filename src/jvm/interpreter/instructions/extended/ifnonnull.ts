import { ReferenceType } from '../../data-types/data-type'
import { Instruction } from '../Instruction'
import { Runtime } from '../../Runtime'

export class ifnonnull extends Instruction {
	length = 3
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const branchbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const branchbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const offset = (branchbyte1 << 8) | branchbyte2
		const value = Runtime.it().pop()
		if (!(value instanceof ReferenceType)) throw new Error('Tried ifnonnull without reference')
		if (value.get()) {
			Runtime.it().jumpByOffset(offset)
		}
	}

	public override toString(): string {
		return 'ifnonnull'
	}
}
