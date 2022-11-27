import { MethodTypes } from './ClassObject'
import { array } from './data-types/array'
import { byte } from './data-types/byte'
import { char } from './data-types/char'
import { classType } from './data-types/classType'
import { DescriptorType } from './data-types/data-type'
import { double } from './data-types/double'
import { float } from './data-types/float'
import { int } from './data-types/int'
import { long } from './data-types/long'
import { short } from './data-types/short'
import { Void } from './data-types/void'

export const getTypesFromMethodDescriptor = (descriptor: string): MethodTypes => {
	const descriptorParts = descriptor.split(')')
	let parameterDescriptors = descriptorParts[0].substring(1)
	const returnDescriptor = descriptorParts[1]

	const parameters: DescriptorType[] = []
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
	if (returnDescriptor == 'V') returnType = Void
	else if (!returnType) throw `Could not determine return descriptor: ${returnDescriptor}`

	return {
		parameters,
		returnType
	}
}

export const getTypeFromFieldDescriptor = (descriptor: string): DescriptorType | undefined => {
	switch (descriptor) {
		case 'B': return byte
		case 'C': return char
		case 'D': return double
		case 'F': return float
		case 'I': return int
		case 'J': return long
		case 'S': return short
		case 'Z': return int
	}
	if (descriptor.startsWith('[')) {
		switch (descriptor.substring(1)) {
			case 'B': return array<byte>
			case 'C': return array<char>
			case 'D': return array<double>
			case 'F': return array<float>
			case 'I': return array<int>
			case 'J': return array<long>
			case 'S': return array<short>
			case 'Z': return array<int>
		}
	}
	if (descriptor.startsWith('L')) return classType
	return undefined
}
