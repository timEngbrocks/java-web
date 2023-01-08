import dedent from 'dedent'
import type { AttributeInfoHeader } from '../AttributeInfo'
import type { ConstantClass } from '../constants/ConstantClass'
import { JType, JTypeData } from '../JType'

export interface AttributePermittedSubclassesData extends JTypeData {
	header: AttributeInfoHeader
	numberOfClasses: number
	classes: ConstantClass[]
}

export class AttributePermittedSubclasses extends JType<AttributePermittedSubclassesData> {
	public override toString(): string {
		return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}
        numberOfClasses: ${this.data.numberOfClasses}`
	}
}
