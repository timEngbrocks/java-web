import { Instruction } from '../Instruction'

export class invokedynamic extends Instruction {
	length = 5
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		throw new Error('TODO: implement invokedynamic')
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		return `invokedynamic @ ${index}`
	}
}
