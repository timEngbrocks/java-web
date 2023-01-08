import { BlockType } from './BlockType'

export class Block extends BlockType {
	public override get(): undefined { return undefined }
	public override set(): void { throw new Error('Tried setting block type') }
	public override toString(): string { return 'block' }
	public override toPrintableString(): string { return 'block' }
}
