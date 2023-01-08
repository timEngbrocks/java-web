import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class iload extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const localVariable = RuntimeManager.it().getLocal(index)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `iload @ ${index}`
	}
}

export class lload extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const localVariable = RuntimeManager.it().getLocal(index)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `lload @ ${index}`
	}
}

export class fload extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const localVariable = RuntimeManager.it().getLocal(index)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `fload @ ${index}`
	}
}

export class dload extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const localVariable = RuntimeManager.it().getLocal(index)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `dload @ ${index}`
	}
}

export class aload extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const localVariable = RuntimeManager.it().getLocal(index)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `aload @ ${index}`
	}
}
