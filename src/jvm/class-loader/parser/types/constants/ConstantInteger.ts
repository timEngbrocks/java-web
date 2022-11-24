import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import { ConstantValueData } from './ConstantValueData'

export interface ConstantIntegerData extends ConstantValueData {
	tag: number
	value: number
}

export class ConstantInteger extends CPInfo<ConstantIntegerData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        value: ${this.data.value}`
	}
}
