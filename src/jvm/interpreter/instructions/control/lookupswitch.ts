import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class lookupswitch extends Instruction {
	override length = -1
	override args = ''
	constructor(private readonly address: number) {
		super()
	}

	public override setArgs(args: string): void {
		this.args = args
		this.calculateLength()
	}

	public override execute(): void {
		const key = RuntimeManager.it().pop().get()
		const padding = this.calculatePadding()
		const { defaultValue, npairs } = this.calculateDefaultValueNpairs()

		const matchOffsets = []
		for (let i = 0; i < npairs; i++) {
			const offset = 16 + i * 16 + padding
			const byte1 = Number.parseInt(this.args.substring(offset + 0, offset + 2), 16)
			const byte2 = Number.parseInt(this.args.substring(offset + 2, offset + 4), 16)
			const byte3 = Number.parseInt(this.args.substring(offset + 4, offset + 6), 16)
			const byte4 = Number.parseInt(this.args.substring(offset + 6, offset + 8), 16)
			const byte5 = Number.parseInt(this.args.substring(offset + 8, offset + 10), 16)
			const byte6 = Number.parseInt(this.args.substring(offset + 10, offset + 12), 16)
			const byte7 = Number.parseInt(this.args.substring(offset + 12, offset + 14), 16)
			const byte8 = Number.parseInt(this.args.substring(offset + 14, offset + 16), 16)
			matchOffsets.push({
				match: this.constructValue(byte1, byte2, byte3, byte4),
				offset: this.constructValue(byte5, byte6, byte7, byte8)
			})
		}

		matchOffsets.sort((a, b) => {
			if (a.match < b.match) return -1
			else if (a.match == b.match) return 0
			return 1
		})

		let offset = 0
		for (const matchOffset of matchOffsets) {
			if (matchOffset.match == key) {
				offset = matchOffset.offset
			}
		}
		if (offset == 0) offset = defaultValue

		ExecutionManager.it().jumpByOffset(offset)
	}

	public override toString(): string {
		this.calculateLength()
		return `lookupswitch ${this.length}`
	}

	public calculateLength(): void {
		const padding = this.calculatePadding()
		const { npairs } = this.calculateDefaultValueNpairs()
		this.length = 9 + padding / 2 + (npairs * 8)
	}

	private constructValue(byte1: number, byte2: number, byte3: number, byte4: number): number {
		return (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4
	}

	private calculateDefaultValueNpairs(): { defaultValue: number, npairs: number } {
		const padding = this.calculatePadding()
		const defaultbyte1 = Number.parseInt(this.args.substring(padding + 0, padding + 2), 16)
		const defaultbyte2 = Number.parseInt(this.args.substring(padding + 2, padding + 4), 16)
		const defaultbyte3 = Number.parseInt(this.args.substring(padding + 4, padding + 6), 16)
		const defaultbyte4 = Number.parseInt(this.args.substring(padding + 6, padding + 8), 16)
		const defaultValue = this.constructValue(defaultbyte1, defaultbyte2, defaultbyte3, defaultbyte4)
		const npairs1 = Number.parseInt(this.args.substring(padding + 8, padding + 10), 16)
		const npairs2 = Number.parseInt(this.args.substring(padding + 10, padding + 12), 16)
		const npairs3 = Number.parseInt(this.args.substring(padding + 12, padding + 14), 16)
		const npairs4 = Number.parseInt(this.args.substring(padding + 14, padding + 16), 16)
		const npairs = this.constructValue(npairs1, npairs2, npairs3, npairs4)
		return { defaultValue, npairs }
	}

	private calculatePadding(): number {
		const start = (this.address + 2) / 2
		return 2 * ((start) % 4 == 0 ? 0 : 4 - (start % 4))
	}
}
