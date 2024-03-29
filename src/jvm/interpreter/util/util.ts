import { map } from 'lodash'
import type { ClassInstance } from '../class/ClassInstance'
import { ArrayType } from '../data-types/ArrayType'
import { byte } from '../data-types/byte'
import { char } from '../data-types/char'
import { ClassType } from '../data-types/ClassType'
import type { DescriptorType } from '../data-types/DescriptorType'
import { double } from '../data-types/double'
import { float } from '../data-types/float'
import { int } from '../data-types/int'
import { long } from '../data-types/long'
import { ReferenceType } from '../data-types/ReferenceType'
import { short } from '../data-types/short'
import { ClassManager } from '../manager/ClassManager'
import { RuntimeManager } from '../manager/RuntimeManager'
import type { MethodTypes } from './MethodTypes'

export const constructStringClass = (text: string): ReferenceType => {
	const stringClass = ClassManager.it().newInstance('java/lang/String')
	stringClass.initializeIfUninitialized()
	const stringValue = new ArrayType(new byte())
	for (let i = 0; i < text.length; i++) {
		stringValue.get().push(RuntimeManager.it().allocate(new byte(text.charCodeAt(i))))
	}
	stringClass.putField('value', RuntimeManager.it().allocate(stringValue))
	return RuntimeManager.it().allocate(stringClass)
}

export const getTextFromString = (stringRef: ReferenceType): string => {
	const stringClass = RuntimeManager.it().load(stringRef) as ClassInstance
	const valueRef = stringClass.getField('value') as ReferenceType
	const value = RuntimeManager.it().load(valueRef) as ArrayType
	const bytes = []
	for (const reference of value.get()) {
		const byte = RuntimeManager.it().load(reference) as byte
		bytes.push(byte.get() as number)
	}
	return map(bytes, x => String.fromCharCode(x)).join()
}

export const getTypeNamesFromMethodDescriptor = (descriptor: string): { parameters: string[], returnType: string } => {
	const descriptorParts = descriptor.split(')')
	let parameterDescriptors = descriptorParts[0].substring(1)
	const returnDescriptor = descriptorParts[1]

	const parameters: string[] = []
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
		parameters.push(parameterDescriptor)
	}

	const returnType = getTypeNameFromFieldDescriptor(returnDescriptor)

	return { parameters, returnType }
}

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

export const getTypeNameFromFieldDescriptor = (descriptor: string): string => {
	switch (descriptor) {
		case 'B': return 'B'
		case 'C': return 'C'
		case 'D': return 'D'
		case 'F': return 'F'
		case 'I': return 'I'
		case 'J': return 'J'
		case 'S': return 'S'
		case 'Z': return 'Z'
	}
	if (descriptor.startsWith('[[')) {
		return '[' + getTypeNameFromFieldDescriptor(descriptor.substring(1))
	}
	if (descriptor.startsWith('[')) {
		switch (descriptor.substring(1, 2)) {
			case 'B': {
				return '[B'
			}
			case 'C': {
				return '[C'
			}
			case 'D': {
				return '[D'
			}
			case 'F': {
				return '[F'
			}
			case 'I': {
				return '[I'
			}
			case 'J': {
				return '[J'
			}
			case 'S': {
				return '[S'
			}
			case 'Z': {
				return '[Z'
			}
		}
		if (descriptor.substring(1).startsWith('L') && descriptor.endsWith(';')) {
			descriptor.substring(0, descriptor.length - 1)
		}
	}
	if (descriptor.startsWith('L') && descriptor.endsWith(';')) {
		return descriptor.substring(1, descriptor.length - 1)
	}
	return 'java/lang/Void'
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
