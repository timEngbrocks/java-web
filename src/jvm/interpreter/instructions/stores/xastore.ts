import { byte } from '../../data-types/byte'
import { char } from '../../data-types/char'
import { ArrayType, DataType, ReferenceType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { short } from '../../data-types/short'
import { Runtime } from '../../Runtime'
import { Instruction } from '../Instruction'

class xastore<T extends DataType<any>> extends Instruction {
	length = 1
	constructor(private readonly type: new () => T) {
		super()
	}

	public override execute(): void {
		const value = Runtime.it().pop() as T
		const index = Runtime.it().pop() as int
		const arrayRef = (Runtime.it().pop() as ReferenceType).get()
		if (!arrayRef) throw new Error('Null dereference in xastore')
		const array = Runtime.it().load(arrayRef) as ArrayType
		const values = array.get()
		const valueAddress = Runtime.it().allocate(value)
		values[index.get() as number] = new ReferenceType(valueAddress)
		array.set(values)
	}

	public override toString(): string {
		return `${this.newConstant().toString()} : astore`
	}

	private newConstant(): T {
		return new this.type()
	}
}

export const iastore = new xastore<int>(int)
export const lastore = new xastore<long>(long)
export const fastore = new xastore<float>(float)
export const dastore = new xastore<double>(double)
export const aastore = new xastore<ReferenceType>(ReferenceType)
export const bastore = new xastore<byte>(byte)
export const castore = new xastore<char>(char)
export const sastore = new xastore<short>(short)
