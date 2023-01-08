import type { ConstantData } from './constants/ConstantData'
import { JType } from './JType'

export class CPInfo<T extends ConstantData> extends JType<T> {}
