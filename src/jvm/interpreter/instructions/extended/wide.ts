import { int } from '../../data-types/int'
import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'
import { OpCodes } from '../opcodes'

export class wide extends Instruction {
	override length = -1
	override args = ''

	private opcode = 0

	public override setArgs(args: string): void {
		this.args = args
		this.calculateOpCode()
	}

	public override execute(): void {
		if (this.opcode === OpCodes.iinc) {
			const indexbyte1 = Number.parseInt(this.args.substring(2, 4), 16)
			const indexbyte2 = Number.parseInt(this.args.substring(4, 6), 16)
			const index = (indexbyte1 << 8) | indexbyte2
			const constbyte1 = Number.parseInt(this.args.substring(6, 8), 16)
			const constbyte2 = Number.parseInt(this.args.substring(8, 10), 16)
			const constant = (constbyte1 << 8) | constbyte2
			const localVariable = RuntimeManager.it().getLocal(index)
			RuntimeManager.it().setLocal(new int(localVariable.get() + constant), index)
		} else {
			const indexbyte1 = Number.parseInt(this.args.substring(2, 4), 16)
			const indexbyte2 = Number.parseInt(this.args.substring(4, 6), 16)
			const index = (indexbyte1 << 8) | indexbyte2
			if (this.opcode === OpCodes.iload || this.opcode === OpCodes.fload || this.opcode === OpCodes.aload || this.opcode === OpCodes.dload) {
				const localVariable = RuntimeManager.it().getLocal(index)
				RuntimeManager.it().push(localVariable)
			} else if (this.opcode === OpCodes.ret) {
				const address = RuntimeManager.it().getLocal(index)
				ExecutionManager.it().setPC(address.get())
			} else {
				const value = RuntimeManager.it().pop()
				RuntimeManager.it().setLocal(value, index)
			}
		}
	}

	public override toString(): string {
		return `wide - ${this.opcode}`
	}

	private calculateOpCode(): void {
		this.opcode = Number.parseInt(this.args.substring(0, 2), 16)
		if (this.opcode === OpCodes.iinc) this.length = 6
		else this.length = 4
	}
}
