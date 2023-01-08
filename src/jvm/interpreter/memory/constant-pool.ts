import type { CPInfo } from '../../parser/types/CPInfo'

export class ConstantPool {
	public constants: CPInfo<any>[]

	constructor(constants: CPInfo<any>[]) {
		this.constants = constants
	}

	public get(index: number): CPInfo<any> {
		return this.constants[index - 1]
	}
}
