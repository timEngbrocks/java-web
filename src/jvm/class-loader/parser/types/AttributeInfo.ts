import dedent from 'dedent'
import { JType, JTypeData } from './JType'

export interface AttributeInfoHeader {
	attributeNameIndex: number
	attributeLength: number
}

export interface AttributeInfoData extends JTypeData {
	header: AttributeInfoHeader
}

export class AttributeInfo<T extends AttributeInfoData> extends JType<T> {
	public override toString(): string {
		return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}`
	}
}
