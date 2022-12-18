import { byte } from '../../data-types/byte'
import { char } from '../../data-types/char'
import { ArrayType, ReferenceType } from '../../data-types/data-type'
import { double } from '../../data-types/double'
import { float } from '../../data-types/float'
import { int } from '../../data-types/int'
import { long } from '../../data-types/long'
import { short } from '../../data-types/short'
import { Runtime } from '../../Runtime'
import { Instruction } from '../Instruction'

export enum NewArrayTypes {
	T_BOOLEAN = 4,
	T_CHAR = 5,
	T_FLOAT = 6,
	T_DOUBLE = 7,
	T_BYTE = 8,
	T_SHORT = 9,
	T_INT = 10,
	T_LONG = 11
}

export class newarray extends Instruction {
	length = 2
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const atype = Number.parseInt(this.args.substring(0, 2), 16)
		const count = Runtime.it().pop() as int
		const newArray = this.getNewArrayOfTypeAndLength(atype, count.get() as number)
		const arrayAddress = Runtime.it().allocate(newArray)
		Runtime.it().push(new ReferenceType(arrayAddress))
	}

	public override toString(): string {
		return 'newarray'
	}

	private getNewArrayOfTypeAndLength(type: number, length: number): ArrayType {
		switch (type) {
			case NewArrayTypes.T_BOOLEAN: return new ArrayType(new int(), length)
			case NewArrayTypes.T_CHAR: return new ArrayType(new char(), length)
			case NewArrayTypes.T_FLOAT: return new ArrayType(new float(), length)
			case NewArrayTypes.T_DOUBLE: return new ArrayType(new double(), length)
			case NewArrayTypes.T_BYTE: return new ArrayType(new byte(), length)
			case NewArrayTypes.T_SHORT: return new ArrayType(new short(), length)
			case NewArrayTypes.T_INT: return new ArrayType(new int(), length)
			case NewArrayTypes.T_LONG: return new ArrayType(new long(), length)
		}
		throw new Error(`Could not construct array of type: ${type}, ${length}`)
	}
}
