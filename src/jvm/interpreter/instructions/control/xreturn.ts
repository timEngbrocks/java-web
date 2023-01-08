import { int } from '../../data-types/int'
import { ExecutionManager } from '../../manager/ExecutionManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class ireturn extends Instruction {
	override length = 1

	// FIXME: synchronized method return
	public override execute(): void {
		const value = RuntimeManager.it().pop()
		const returnValue = new int(value.get())
		ExecutionManager.it().setReturnValue(returnValue)
		ExecutionManager.it().returnFromFunction()
	}

	public override toString(): string {
		return 'ireturn'
	}
}

export class lreturn extends Instruction {
	override length = 1

	// FIXME: synchronized method return
	public override execute(): void {
		const value = RuntimeManager.it().pop()
		ExecutionManager.it().setReturnValue(value)
		ExecutionManager.it().returnFromFunction()
	}

	public override toString(): string {
		return 'lreturn'
	}
}

export class freturn extends Instruction {
	override length = 1

	// FIXME: synchronized method return
	public override execute(): void {
		const value = RuntimeManager.it().pop()
		ExecutionManager.it().setReturnValue(value)
		ExecutionManager.it().returnFromFunction()
	}

	public override toString(): string {
		return 'freturn'
	}
}

export class dreturn extends Instruction {
	override length = 1

	// FIXME: synchronized method return
	public override execute(): void {
		const value = RuntimeManager.it().pop()
		ExecutionManager.it().setReturnValue(value)
		ExecutionManager.it().returnFromFunction()
	}

	public override toString(): string {
		return 'dreturn'
	}
}

export class areturn extends Instruction {
	override length = 1

	// FIXME: synchronized method return
	public override execute(): void {
		const value = RuntimeManager.it().pop()
		ExecutionManager.it().setReturnValue(value)
		ExecutionManager.it().returnFromFunction()
	}

	public override toString(): string {
		return 'areturn'
	}
}

export class Return extends Instruction {
	override length = 1

	// FIXME: synchronized method return
	public override execute(): void {
		ExecutionManager.it().returnFromFunction()
	}

	public override toString(): string {
		return 'return'
	}
}
