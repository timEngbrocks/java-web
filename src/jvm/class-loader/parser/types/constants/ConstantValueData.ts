import { ConstantData } from './ConstantData'

export interface ConstantValueData extends ConstantData {
	tag: number
	value: number | bigint
}
