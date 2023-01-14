import { int } from '../../data-types/int'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class sipush extends Instruction {
	override length: number = 3
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		if (this.args.length !== 4) throw new Error(`Tried calling sipush with incorrect amount of arguments. Expected 4 but found ${this.args.length}`)
		const byte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const byte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const value = new int()
		value.set(this.signExtendToInt((byte1 << 8) | byte2))
		RuntimeManager.it().push(value)
	}

	public override toString(): string {
		return `sipush 0x${this.args.substring(0, 2)} 0x${this.args.substring(2, 4)}`
	}

	private signExtendToInt(value: number): number {
		const binary = value.toString(2).padStart(16, '0')
		const extended = binary.padStart(32, binary.charAt(0))
		return Number.parseInt(extended, 2) >> 0
	}
}
