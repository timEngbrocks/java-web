import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import { ClassObject } from '../class/ClassObject'
import { ClassObjectManager } from '../class/ClassObjectManager'
import { DataType } from '../data-types/data-type'
import { int } from '../data-types/int'
import { InstructionStream } from '../instructions/InstructionStream'
import { ConstantPool } from '../memory/constant-pool'
import { MethodObject } from './MethodObject'
import { getTypeFromFieldDescriptor } from './util'

export const createArrayClass = (descriptor: string): void => {
	const type = getTypeFromFieldDescriptor(descriptor)
	const staticFields = new Map<string, DataType<any>>()
	const fields = new Map<string, DataType<any>>()
	fields.set('length', new int())
	// fields.set('[value', type)
	const methods = new Map<string, MethodObject>()
	methods.set('clone ()' + descriptor, {
		name: 'clone',
		descriptor: '()' + descriptor,
		className: descriptor,
		accessFlags: MethodAccessFlags.ACC_PUBLIC,
		types: {
			parameters: [],
			returnType: type
		},
		maxLocals: 0,
		maxStack: 0,
		instructionStream: new InstructionStream('')
	})
	const superInterfaces = new Set<string>()
	superInterfaces.add('java/lang/Cloneable')
	superInterfaces.add('java/io/Serializable')
	const classObject = new ClassObject(
		descriptor,
		new ConstantPool([]),
		staticFields,
		fields,
		methods,
		'java/lang/Object',
		superInterfaces
	)
	ClassObjectManager.addClass(classObject)
	classObject.initializeIfUninitialized()
}
