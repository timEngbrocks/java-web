import type { DataType } from '../../data-types/data-type'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

class xushr<T extends DataType<any>> extends Instruction {
	override length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value2 = RuntimeManager.it().pop().get()
		const value1 = RuntimeManager.it().pop().get()
		const result = this.newConstant()
		if (result instanceof long) {
			const s = BigInt(value2) & 0b11111n
			if (BigInt(value1) >= 0n && s === (BigInt(value2) & 0x3fn)) {
				result.set(BigInt(value1) >> s)
			} else {
				result.set((BigInt(value1) >> s) + (2n << ~s))
			}
		} else {
			const s = value2 & 0b11111
			result.set(value1 >>> s)
		}
		RuntimeManager.it().push(result)
	}

	public override toString(): string {
		return `${this.newConstant().toPrintableString()}ushr`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const iushr = new xushr<int>(int)
export const lushr = new xushr<long>(long)
