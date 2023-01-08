import dedent from 'dedent'
import { CPInfo } from '../CPInfo'
import type { ConstantData } from './ConstantData'

export enum MethodHandleReferenceKind {
	REF_getField = 1,
	REF_getStatic = 2,
	REF_putField = 3,
	REF_putStatic = 4,
	REF_invokeVirtual = 5,
	REF_invokeStatic = 6,
	REF_invokeSpecial = 7,
	REF_newInvokeSpecial = 8,
	REF_invokeInterface = 9,
}

export interface ConstantMethodHandleData extends ConstantData {
	tag: number
	referenceKind: MethodHandleReferenceKind
	referenceIndex: number
}

export class ConstantMethodHandle extends CPInfo<ConstantMethodHandleData> {
	public override toString(): string {
		return dedent`tag: ${this.data.tag}
        referenceKind: ${this.data.referenceKind}
        referenceIndex: ${this.data.referenceIndex}`
	}
}
