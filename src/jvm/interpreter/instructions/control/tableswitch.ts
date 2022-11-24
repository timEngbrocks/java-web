import { Instruction } from '../../Instruction'
import { Runtime } from '../../Runtime'

export class tableswitch extends Instruction {
	length = -1
	args = ''
	public override setArgs(args: string): void {
		this.args = args
		this.calculateLength()
	}

	public override execute(): void {
		const index = Runtime.pop().get()
		const padding = this.calculatePadding()
		const { defaultValue, lowValue, highValue } = this.calculateDefaultLowHighValues()

		const offsets = []
		for (let i = 0; i < (highValue - lowValue + 1); i++) {
			const offset = 24 + i * 8 + padding
			const byte1 = Number.parseInt(this.args.substring(offset + 0, offset + 2), 16)
			const byte2 = Number.parseInt(this.args.substring(offset + 2, offset + 4), 16)
			const byte3 = Number.parseInt(this.args.substring(offset + 4, offset + 6), 16)
			const byte4 = Number.parseInt(this.args.substring(offset + 6, offset + 8), 16)
			offsets.push(this.constructValue(byte1, byte2, byte3, byte4))
		}

		let offset = 0
		if (index < lowValue || index > highValue) {
			offset = defaultValue
		} else {
			offset = offsets[index - lowValue]
		}

		Runtime.jumpByOffset(offset)
	}

	public override toString(): string {
		return 'tableswitch'
	}

	public calculateLength(): void {
		const padding = this.calculatePadding()
		const { lowValue, highValue } = this.calculateDefaultLowHighValues()
		this.length = 13 + padding + ((highValue - lowValue + 1) * 4)
	}

	private constructValue(byte1: number, byte2: number, byte3: number, byte4: number): number {
		return (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4
	}

	private calculateDefaultLowHighValues(): { defaultValue: number, lowValue: number, highValue: number } {
		const padding = this.calculatePadding()
		const defaultbyte1 = Number.parseInt(this.args.substring(padding + 0, padding + 2), 16)
		const defaultbyte2 = Number.parseInt(this.args.substring(padding + 2, padding + 4), 16)
		const defaultbyte3 = Number.parseInt(this.args.substring(padding + 4, padding + 6), 16)
		const defaultbyte4 = Number.parseInt(this.args.substring(padding + 6, padding + 8), 16)
		const defaultValue = this.constructValue(defaultbyte1, defaultbyte2, defaultbyte3, defaultbyte4)
		const lowbyte1 = Number.parseInt(this.args.substring(padding + 8, padding + 10), 16)
		const lowbyte2 = Number.parseInt(this.args.substring(padding + 10, padding + 12), 16)
		const lowbyte3 = Number.parseInt(this.args.substring(padding + 12, padding + 14), 16)
		const lowbyte4 = Number.parseInt(this.args.substring(padding + 14, padding + 16), 16)
		const lowValue = this.constructValue(lowbyte1, lowbyte2, lowbyte3, lowbyte4)
		const highbyte1 = Number.parseInt(this.args.substring(padding + 16, padding + 18), 16)
		const highbyte2 = Number.parseInt(this.args.substring(padding + 18, padding + 20), 16)
		const highbyte3 = Number.parseInt(this.args.substring(padding + 20, padding + 22), 16)
		const highbyte4 = Number.parseInt(this.args.substring(padding + 22, padding + 24), 16)
		const highValue = this.constructValue(highbyte1, highbyte2, highbyte3, highbyte4)
		return { defaultValue, lowValue, highValue }
	}

	private calculatePadding(): number {
		const pc = Runtime.getPC()
		return (pc + 1) % 4 == 0 ? 0 : 4 - ((pc + 1) % 4)
	}
}
