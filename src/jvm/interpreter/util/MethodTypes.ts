import type { DescriptorType } from '../data-types/DescriptorType'

export interface MethodTypes {
	parameters: DescriptorType<any>[]
	returnType: DescriptorType<any> | undefined
}
