import { byte } from '../data-types/byte'
import { char } from '../data-types/char'
import { ArrayType, ClassType, DescriptorType, ReferenceType } from '../data-types/data-type'
import { double } from '../data-types/double'
import { float } from '../data-types/float'
import { int } from '../data-types/int'
import { long } from '../data-types/long'
import { short } from '../data-types/short'
import { MethodTypes } from './MethodTypes'

export const getTypesFromMethodDescriptor = (descriptor: string): MethodTypes => {
	const descriptorParts = descriptor.split(')')
	let parameterDescriptors = descriptorParts[0].substring(1)
	const returnDescriptor = descriptorParts[1]

	const parameters: DescriptorType<any>[] = []
	let cursor = 1
	while (parameterDescriptors != '' && cursor <= parameterDescriptors.length) {
		const parameterDescriptor = parameterDescriptors.substring(0, cursor)
		const type = getTypeFromFieldDescriptor(parameterDescriptor)
		if (!type) {
			cursor++
			continue
		}
		parameterDescriptors = parameterDescriptors.substring(cursor)
		cursor = 1
		parameters.push(type)
	}

	let returnType = getTypeFromFieldDescriptor(returnDescriptor)
	if (returnDescriptor == 'V') returnType = undefined
	else if (!returnType) throw new Error(`Could not determine return descriptor: ${returnDescriptor}`)

	return {
		parameters,
		returnType
	}
}

export const getTypeFromFieldDescriptor = (descriptor: string): DescriptorType<any> | undefined => {
	switch (descriptor) {
		case 'B': return new byte()
		case 'C': return new char()
		case 'D': return new double()
		case 'F': return new float()
		case 'I': return new int()
		case 'J': return new long()
		case 'S': return new short()
		case 'Z': return new int()
	}
	if (descriptor.startsWith('[[')) {
		return new ReferenceType({ address: null, name: descriptor })
	}
	if (descriptor.startsWith('[')) {
		switch (descriptor.substring(1, 2)) {
			case 'B': {
				return new ReferenceType({ address: null, name: '[B' })
			}
			case 'C': {
				return new ReferenceType({ address: null, name: '[C' })
			}
			case 'D': {
				return new ReferenceType({ address: null, name: '[D' })
			}
			case 'F': {
				return new ReferenceType({ address: null, name: '[F' })
			}
			case 'I': {
				return new ReferenceType({ address: null, name: '[I' })
			}
			case 'J': {
				return new ReferenceType({ address: null, name: '[J' })
			}
			case 'S': {
				return new ReferenceType({ address: null, name: '[S' })
			}
			case 'Z': {
				return new ReferenceType({ address: null, name: '[Z' })
			}
		}
		if (descriptor.substring(1).startsWith('L') && descriptor.endsWith(';')) {
			return new ReferenceType({ address: null, name: descriptor.substring(0, descriptor.length - 1) })
		}
	}
	if (descriptor.startsWith('L') && descriptor.endsWith(';')) {
		return new ReferenceType({ address: null, name: descriptor.substring(1, descriptor.length - 1) })
	}
	return undefined
}

export const constructArrayFromArrayClassName = (className: String, count = 0): ArrayType => {
	const typeName = className.substring(1)
	if (typeName.startsWith('[')) {
		const subType = constructArrayFromArrayClassName(typeName.substring(1), count)
		return new ArrayType(new ArrayType(subType, count), count)
	}
	switch (typeName) {
		case 'B': return new ArrayType(new byte(), count)
		case 'C': return new ArrayType(new char(), count)
		case 'D': return new ArrayType(new double(), count)
		case 'F': return new ArrayType(new float(), count)
		case 'I': return new ArrayType(new int(), count)
		case 'J': return new ArrayType(new long(), count)
		case 'S': return new ArrayType(new short(), count)
		case 'Z': return new ArrayType(new int(), count)
		default: return new ArrayType(new ClassType(), count)
	}
}
