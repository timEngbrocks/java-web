import { CPInfo } from '../CPInfo'
import { ConstantData } from './ConstantData'

export interface EmptyBlockData extends ConstantData {}

export class EmptyBlock extends CPInfo<EmptyBlockData> {
	public override toString(): string {
		return 'empty block'
	}
}
