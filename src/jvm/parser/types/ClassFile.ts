import dedent from 'dedent'
import { AttributeInfo } from './AttributeInfo'
import { CPInfo } from './CPInfo'
import { FieldInfo } from './FieldInfo'
import { JType, JTypeData } from './JType'
import { MethodInfo } from './MethodInfo'

export enum ClassAccessFlag {
	ACC_PUBLIC = 0x0001,
	ACC_FINAL = 0x0010,
	ACC_SUPER = 0x0020,
	ACC_INTERFACE = 0x0200,
	ACC_ABSTRACT = 0x0400,
	ACC_SYNTHETIC = 0x1000,
	ACC_ANNOTATION = 0x2000,
	ACC_ENUM = 0x400,
}

export interface ClassFileHeaderData {
	magic: string
	minorVersion: number
	majorVersion: number
	constantPoolCount: number
	constantPool: CPInfo<any>[]
	accessFlags: number
}

export interface ClassFileData extends JTypeData {
	header: ClassFileHeaderData
	thisClass: number
	superClass: number
	interfacesCount: number
	interfaces: number[]
	fieldsCount: number
	fields: FieldInfo[]
	methodsCount: number
	methods: MethodInfo[]
	attributesCount: number
	attributes: AttributeInfo<any>[]
}

export class ClassFile extends JType<ClassFileData> {
	public override toString(): string {
		return dedent`magic: ${this.data.header.magic}
            version: ${this.data.header.majorVersion}.${this.data.header.minorVersion}
            access flags: ${this.data.header.accessFlags}
            this: ${this.data.thisClass}
            super: ${this.data.superClass}
            #constants: ${this.data.header.constantPoolCount}
            #interfaces: ${this.data.interfacesCount}
            #fields: ${this.data.fieldsCount}
            #methods: ${this.data.methodsCount}
            #attributes: ${this.data.attributesCount}`
	}
}
