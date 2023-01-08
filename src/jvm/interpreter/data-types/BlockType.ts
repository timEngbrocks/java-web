import { DataType } from './data-type'

export class BlockType extends DataType<undefined> {
	constructor(protected override value = undefined) {
		super(value)
	}
}
