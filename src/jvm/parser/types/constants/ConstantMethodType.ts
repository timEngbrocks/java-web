import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import { ConstantData } from './ConstantData'

export interface ConstantMethodTypeData extends ConstantData {
	tag: number
	descriptorIndex: number
}

export class ConstantMethodType extends CPInfo<ConstantMethodTypeData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        descriptorIndex: ${this.data.descriptorIndex}`
	}
}
