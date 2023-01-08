import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class iload_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(0)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'iload_0'
	}
}

export class iload_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(1)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'iload_1'
	}
}

export class iload_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(2)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'iload_2'
	}
}

export class iload_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(3)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'iload_3'
	}
}

export class lload_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(0)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'lload_0'
	}
}

export class lload_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(1)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'lload_1'
	}
}

export class lload_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(2)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'lload_2'
	}
}

export class lload_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(3)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'lload_3'
	}
}
export class fload_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(0)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'fload_0'
	}
}

export class fload_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(1)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'fload_1'
	}
}

export class fload_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(2)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'fload_2'
	}
}

export class fload_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(3)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'fload_3'
	}
}
export class dload_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(0)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'dload_0'
	}
}

export class dload_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(1)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'dload_1'
	}
}

export class dload_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(2)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'dload_2'
	}
}

export class dload_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(3)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'dload_3'
	}
}
export class aload_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(0)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'aload_0'
	}
}

export class aload_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(1)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'aload_1'
	}
}

export class aload_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(2)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'aload_2'
	}
}

export class aload_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const localVariable = RuntimeManager.it().getLocal(3)
		RuntimeManager.it().push(localVariable)
	}

	public override toString(): string {
		return 'aload_3'
	}
}
