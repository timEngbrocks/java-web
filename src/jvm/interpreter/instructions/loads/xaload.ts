import { byte } from '../../data-types/byte'
import { char } from '../../data-types/char'
import { ArrayType, DataType, ReferenceType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { short } from '../../data-types/short'
import { Instruction } from '../Instruction'
import { HEAP_TYPES } from '../../memory/heap'
import { Runtime } from '../../Runtime'

class xaload<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const index = Runtime.it().pop()
		const arrayRef = Runtime.it().pop()
		if (!(arrayRef instanceof ReferenceType && index instanceof int)) throw new Error('Did not find correct operand types on stack for xaload')
		const ref = arrayRef.get()
		if (!ref) throw new Error('Null dereference in xaload')
		if (!(ref !== null && ref.getType() === HEAP_TYPES.ARRAY)) throw new Error('Tried loading from array without a non-null array reference')
		const heapObject = Runtime.it().load(ref)
		if (!(heapObject instanceof ArrayType)) throw new Error('Tried to load array of incompatible type')
		const valueRef = heapObject.get()[index.get() as number]
		if (this.newConstant() instanceof ReferenceType) Runtime.it().push(valueRef)
		else {
			const value = Runtime.it().load(valueRef.get()!) as T
			if (this.newConstant() instanceof short) {
				// FIXME: sign-extension?
				Runtime.it().push(new int(value.get()))
			} else if (this.newConstant() instanceof byte) {
				// FIXME: sign-extension?
				Runtime.it().push(new int(value.get()))
			} else if (this.newConstant() instanceof char) {
				// FIXME: zero-extension?
				Runtime.it().push(new int(value.get()))
			} else Runtime.it().push(value)
		}
	}

	public override toString(): string {
		return `${this.newConstant().toString()} : aload`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const iaload = new xaload<int>(int)
export const laload = new xaload<long>(long)
export const faload = new xaload<float>(float)
export const daload = new xaload<double>(double)
export const aaload = new xaload<ReferenceType>(ReferenceType)
export const baload = new xaload<byte>(byte)
export const caload = new xaload<char>(char)
export const saload = new xaload<short>(short)
