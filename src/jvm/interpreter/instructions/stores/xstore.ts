import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class istore extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, index)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `istore @ ${index}`
	}
}

export class lstore extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, index)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `lstore @ ${index}`
	}
}

export class fstore extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, index)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `fstore @ ${index}`
	}
}

export class dstore extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, index)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `dstore @ ${index}`
	}
}

export class astore extends Instruction {
	override length = 2
	override args: string = ''

	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, index)
	}

	public override toString(): string {
		const index = Number.parseInt(this.args.substring(0, 2), 16)
		return `astore @ ${index}`
	}
}
