import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class istore_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 0)
	}

	public override toString(): string {
		return 'istore_0'
	}
}

export class istore_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 1)
	}

	public override toString(): string {
		return 'istore_1'
	}
}

export class istore_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 2)
	}

	public override toString(): string {
		return 'istore_2'
	}
}

export class istore_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 3)
	}

	public override toString(): string {
		return 'istore_3'
	}
}

export class lstore_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 0)
	}

	public override toString(): string {
		return 'lstore_0'
	}
}

export class lstore_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 1)
	}

	public override toString(): string {
		return 'lstore_1'
	}
}

export class lstore_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 2)
	}

	public override toString(): string {
		return 'lstore_2'
	}
}

export class lstore_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 3)
	}

	public override toString(): string {
		return 'lstore_3'
	}
}

export class fstore_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 0)
	}

	public override toString(): string {
		return 'fstore_0'
	}
}

export class fstore_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 1)
	}

	public override toString(): string {
		return 'fstore_1'
	}
}

export class fstore_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 2)
	}

	public override toString(): string {
		return 'fstore_2'
	}
}

export class fstore_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 3)
	}

	public override toString(): string {
		return 'fstore_3'
	}
}

export class dstore_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 0)
	}

	public override toString(): string {
		return 'dstore_0'
	}
}

export class dstore_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 1)
	}

	public override toString(): string {
		return 'dstore_1'
	}
}

export class dstore_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 2)
	}

	public override toString(): string {
		return 'dstore_2'
	}
}

export class dstore_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 3)
	}

	public override toString(): string {
		return 'dstore_3'
	}
}

export class astore_0 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 0)
	}

	public override toString(): string {
		return 'astore_0'
	}
}

export class astore_1 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 1)
	}

	public override toString(): string {
		return 'astore_1'
	}
}

export class astore_2 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 2)
	}

	public override toString(): string {
		return 'astore_2'
	}
}

export class astore_3 extends Instruction {
	override length = 1

	public override execute(): void {
		const value = RuntimeManager.it().pop()
		RuntimeManager.it().setLocal(value, 3)
	}

	public override toString(): string {
		return 'astore_3'
	}
}
