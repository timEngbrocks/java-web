import dedent from 'dedent'
import type { AttributeInfoHeader } from '../AttributeInfo'
import { JType, JTypeData } from '../JType'

export enum AttributeConstantValueTypes {
	int,
	short,
	char,
	byte,
	boolean,
	float,
	long,
	double,
	String
}

export interface AttributeConstantValueData extends JTypeData {
	header: AttributeInfoHeader
	constantValueIndex: number
}

export class AttributeConstantValue extends JType<AttributeConstantValueData> {
	public override toString(): string {
		return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}
        constantValueIndex: ${this.data.constantValueIndex}`
	}
}
