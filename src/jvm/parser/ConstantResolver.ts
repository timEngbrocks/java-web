import type { CPInfo } from './types/CPInfo'

export class ConstantResolver {
	constructor(private readonly constantPool: CPInfo<any>[]) {}

	public resolve(index: number): CPInfo<any> {
		return this.constantPool[index - 1]
	}
}
