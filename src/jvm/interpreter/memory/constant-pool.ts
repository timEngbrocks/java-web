import { ConstantClass } from '../../class-loader/parser/types/constants/ConstantClass'
import { ConstantUtf8 } from '../../class-loader/parser/types/constants/ConstantUtf8'
import { CPInfo } from '../../class-loader/parser/types/CPInfo'

export class ConstantPool {
	public constants: CPInfo<any>[]

	constructor(constants: CPInfo<any>[]) {
		this.constants = constants
	}

	public get(index: number): CPInfo<any> {
		return this.constants[index - 1]
	}

	public getClassName(): string {
		for (const constant of this.constants) {
			if (constant instanceof ConstantClass) {
				return (this.get(constant.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			}
		}
		throw 'Class name not found'
	}
}
