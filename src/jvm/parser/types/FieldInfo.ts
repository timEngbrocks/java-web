import dedent from 'dedent'
import { AttributeInfo } from './AttributeInfo'
import { JType, JTypeData } from './JType'

export interface FieldInfoData extends JTypeData {
	accessFlags: number
	nameIndex: number
	descriptorIndex: number
	attributesCount: number
	attributes: AttributeInfo<any>[]
}

export class FieldInfo extends JType<FieldInfoData> {
	public override toString(): string {
		return dedent`access flags: ${this.data.accessFlags}
        nameIndex: ${this.data.nameIndex}
        descriptorIndex: ${this.data.descriptorIndex}
        #attributes: ${this.data.attributesCount}`
	}
}
