import type { ExecutableInterface } from '../class/ExecutableInterface'
import { DataType } from './data-type'

export class InterfaceType extends DataType<ExecutableInterface> {
	// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
	constructor(protected override value = {} as ExecutableInterface) {
		super(value)
	}

	public override toString(): string { return `intefaceType: ${this.value.getName ? this.value.getName() : 'unset'}` }
	public override toPrintableString(): string { return 'interface' }
}
