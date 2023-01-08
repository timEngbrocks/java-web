import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import type { ConstantData } from './ConstantData'

export interface ConstantModuleData extends ConstantData {
	tag: number
	nameIndex: number
}

export class ConstantModule extends CPInfo<ConstantModuleData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        nameIndex: ${this.data.nameIndex}`
	}
}
