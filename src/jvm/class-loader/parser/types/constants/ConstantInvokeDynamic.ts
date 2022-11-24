import dedent from 'dedent'
import { JType } from '../JType'
import { ConstantData } from './ConstantData'

export interface ConstantInvokeDynamicData extends ConstantData {
	tag: number
	bootstrapMethodAttrIndex: number
	nameAndTypeIndex: number
}

export class ConstantInvokeDynamic extends JType<ConstantInvokeDynamicData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        bootstrapMethodAttrIndex: ${this.data.bootstrapMethodAttrIndex}
        nameAndTypeIndex: ${this.data.nameAndTypeIndex}`
	}
}
