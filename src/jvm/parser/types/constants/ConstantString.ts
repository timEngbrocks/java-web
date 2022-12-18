import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import { ConstantData } from './ConstantData'

export interface ConstantStringData extends ConstantData {
	tag: number
	stringIndex: number
}

export class ConstantString extends CPInfo<ConstantStringData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        stringIndex: ${this.data.stringIndex}`
	}
}
