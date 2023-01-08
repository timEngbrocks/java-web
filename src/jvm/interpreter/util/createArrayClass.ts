import { FieldAccessFlags } from '../../parser/FieldInfoParser'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import { ClassAccessFlag } from '../../parser/types/ClassFile'
import { ClassObject } from '../class/ClassObject'
import type { DataType } from '../data-types/data-type'
import { int } from '../data-types/int'
import { InstructionStream } from '../instructions/InstructionStream'
import { ConstantPool } from '../memory/constant-pool'
import type { MethodObject } from './MethodObject'
import { getTypeFromFieldDescriptor } from './util'

export const createArrayClass = (descriptor: string): ClassObject => {
	const type = getTypeFromFieldDescriptor(descriptor)
	const staticFields = new Map<string, DataType<any>>()
	const fields = new Map<string, DataType<any>>()
	fields.set('length', new int())
	fields.set('[value', type!)
	const fieldSignatures = new Map<string, string>()
	fieldSignatures.set('length', 'I')
	fieldSignatures.set('[value', descriptor)
	const fieldModifiers = new Map<string, number>()
	fieldModifiers.set('length', FieldAccessFlags.ACC_PUBLIC)
	fieldModifiers.set('[value', FieldAccessFlags.ACC_PRIVATE)
	const methods = new Map<string, MethodObject>()
	methods.set('clone ()' + descriptor, {
		name: 'clone',
		descriptor: '()' + descriptor,
		className: descriptor,
		callerName: '',
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
	return new ClassObject(
		descriptor,
		new ConstantPool([]),
		ClassAccessFlag.ACC_ABSTRACT | ClassAccessFlag.ACC_FINAL, // FIXME: component access type
		staticFields,
		new Map<string, string>(),
		new Map<string, number>(),
		fields,
		fieldSignatures,
		fieldModifiers,
		methods,
		'java/lang/Object',
		superInterfaces,
		undefined,
		{ major: 63, minor: 0 }
	)
}
