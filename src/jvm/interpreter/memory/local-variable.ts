import { DataType } from '../data-types/data-type'

export class LocalVariable {
	private variable: DataType<any>

	constructor(variable: DataType<any>) {
		this.variable = variable
	}

	public get(): DataType<any> {
		return this.variable
	}

	public set(variable: DataType<any>): void {
		this.variable = variable
	}
}
