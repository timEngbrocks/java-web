import { int } from '../../data-types/int'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class bipush extends Instruction {
	override length: number = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		if (this.args.length !== 2) throw new Error(`Tried calling bipush with incorrect amount of arguments. Expected 2 but found ${this.args.length}`)
		const byte = Number.parseInt(this.args.substring(0, 2), 16)
		const result = new int((byte & 0xff) | ((byte & (1 << 63))))
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return `bipush 0x${this.args.substring(0, 2)}`
	}
}
