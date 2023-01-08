import dedent from 'dedent'
import type { AttributeInfoHeader } from '../AttributeInfo'
import { JType, JTypeData } from '../JType'

export interface AttributeNestHostData extends JTypeData {
	header: AttributeInfoHeader
	hostClassIndex: number
}

export class AttributeNestHost extends JType<AttributeNestHostData> {
	public override toString(): string {
		return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}
        hostClassIndex: ${this.data.hostClassIndex}`
	}
}
