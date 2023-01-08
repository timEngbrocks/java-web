import { Block } from '../data-types/block'
import type { DataType } from '../data-types/data-type'
import { double } from '../data-types/double'
import { long } from '../data-types/long'

export class LocalVariables {
	private readonly variables: DataType<any>[] = []

	constructor(private readonly size: number, private readonly isNative: boolean = false) {}

	public set(value: DataType<any>, index: number): void {
		if (value instanceof long || value instanceof double) {
			if (index + 1 >= this.size && !this.isNative) throw new Error('Tried setting long or double at the end of local variables')
			this.variables[index + 1] = new Block()
		}
		this.variables[index] = value
	}

	public get(index: number): DataType<any> {
		const variable = this.variables[index]
		if (!variable) throw new Error(`Tried loading unset local variable at ${index}`)
		if (variable.get() instanceof Block) throw new Error(`Tried to get upper half of long or double local variable at ${index}`)
		return variable
	}
}
