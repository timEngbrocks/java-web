import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import type { ConstantData } from './ConstantData'

export interface ConstantPackageData extends ConstantData {
	tag: number
	nameIndex: number
}

export class ConstantPackage extends CPInfo<ConstantPackageData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        nameIndex: ${this.data.nameIndex}`
	}
}
