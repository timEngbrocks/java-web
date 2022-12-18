import { DescriptorType } from '../data-types/data-type'

export interface MethodTypes {
	parameters: DescriptorType<any>[]
	returnType: DescriptorType<any> | undefined
}
