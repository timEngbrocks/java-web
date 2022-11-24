import dedent from 'dedent'
import { JType } from '../JType'
import { ConstantData } from './ConstantData'

export interface ConstantDynamicData extends ConstantData {
	tag: number
	bootstrapMethodAttrIndex: number
	nameAndTypeIndex: number
}

export class ConstantDynamic extends JType<ConstantDynamicData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        bootstrapMethodAttrIndex: ${this.data.bootstrapMethodAttrIndex}
        nameAndTypeIndex: ${this.data.nameAndTypeIndex}`
	}
}
