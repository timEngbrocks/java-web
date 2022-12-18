import dedent from 'dedent'
import { AttributeInfo, AttributeInfoData, AttributeInfoHeader } from '../AttributeInfo'

export interface AttributeBootstrapMethodsBootstrapMethod {
	bootstrapMethodRef: number
	numBootstrapArguments: number
	bootstrapArguments: number[]
}

export interface AttributeBootstrapMethodsData extends AttributeInfoData {
	header: AttributeInfoHeader
	numBootstrapMethods: number
	bootstrapMethods: AttributeBootstrapMethodsBootstrapMethod[]
}

export class AttributeBootstrapMethods extends AttributeInfo<AttributeBootstrapMethodsData> {
	public override toString(): string {
		return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}
        numBootstrapMethods: ${this.data.numBootstrapMethods}`
	}
}
