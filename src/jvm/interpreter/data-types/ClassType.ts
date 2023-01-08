import type { ClassInstance } from '../class/ClassInstance'
import type { ClassObject } from '../class/ClassObject'
import { DataType } from './data-type'

export class ClassType extends DataType<ClassObject | ClassInstance> {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	constructor(protected override value = {} as ClassObject | ClassInstance) {
		super(value)
	}

	public override toString(): string { return `classType: ${this.value.getName ? this.value.getName() : 'unset'}` }
	public override toPrintableString(): string { return 'class' }
}
