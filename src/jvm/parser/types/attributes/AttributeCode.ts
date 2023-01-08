import dedent from 'dedent'
import type { ByteStream } from '../../byte-stream'
import { AttributeInfo, AttributeInfoData, AttributeInfoHeader } from '../AttributeInfo'

export interface AttributeCodeExceptionTableData {
	startPC: number
	endPC: number
	handlerPC: number
	catchType: number
}

export interface AttributeCodeData extends AttributeInfoData {
	header: AttributeInfoHeader
	maxStack: number
	maxLocals: number
	codeLength: number
	code: ByteStream
	exceptionTableLength: number
	exceptionTable: AttributeCodeExceptionTableData[]
	attributesCount: number
	attributes: AttributeInfo<any>[]
}

export class AttributeCode extends AttributeInfo<AttributeCodeData> {
	public getCode(): string {
		const codeString = this.data.code.toHexString()
		return codeString.padStart(this.data.codeLength * 2, '0')
	}

	public override toString(): string {
		return dedent`attributeNameIndex: ${this.data.header.attributeNameIndex}
        attributeLength: ${this.data.header.attributeLength}
        maxStack: ${this.data.maxStack}
        maxLocals: ${this.data.maxLocals}
        codeLength: ${this.data.codeLength}
        code: ${this.getCode()}
        exceptionTableLength: ${this.data.exceptionTableLength}
        attributesCount: ${this.data.attributesCount}`
	}
}
