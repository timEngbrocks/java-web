import dedent from 'dedent'
import { AttributeInfo } from './AttributeInfo'
import { JType, JTypeData } from './JType'

export interface MethodInfoData extends JTypeData {
	accessFlags: number
	nameIndex: number
	descriptorIndex: number
	attributesCount: number
	attributes: AttributeInfo<any>[]
}

export class MethodInfo extends JType<MethodInfoData> {
	public override toString(): string {
		return dedent`access flags: ${this.data.accessFlags}
        nameIndex: ${this.data.nameIndex}
        descriptorIndex: ${this.data.descriptorIndex}
        #attributes: ${this.data.attributesCount}`
	}
}
