import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import type { ConstantData } from './ConstantData'

export interface ConstantInterfaceMethodRefData extends ConstantData {
	tag: number
	classIndex: number
	nameAndTypeIndex: number
}

export class ConstantInterfaceMethodRef extends CPInfo<ConstantInterfaceMethodRefData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        classIndex: ${this.data.classIndex}
        nameAndTypeIndex: ${this.data.nameAndTypeIndex}`
	}
}
