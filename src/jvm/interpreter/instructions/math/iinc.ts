import { Instruction } from '../Instruction'
import { int } from '../../data-types/int'
import { RuntimeManager } from '../../manager/RuntimeManager'

export class iinc extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const constant = this.signExtendHexByteToInt(this.args.substring(2, 4))
		const localVariable = RuntimeManager.it().getLocal(index)
		RuntimeManager.it().setLocal(new int(localVariable.get() + constant), index)
	}

	public override toString(): string {
		return `iinc 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}

	private signExtendHexByteToInt(byte: string): number {
		const binary = Number.parseInt(byte, 16).toString(2).padStart(8, '0')
		const extended = binary.padStart(32, binary.charAt(0))
		return Number.parseInt(extended, 2) >> 0
	}
}
