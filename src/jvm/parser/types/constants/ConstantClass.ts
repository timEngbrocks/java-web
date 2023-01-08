import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import type { ConstantData } from './ConstantData'

export interface ConstantClassData extends ConstantData {
	tag: number
	nameIndex: number
}

export class ConstantClass extends CPInfo<ConstantClassData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        nameIndex: ${this.data.nameIndex}`
	}
}
