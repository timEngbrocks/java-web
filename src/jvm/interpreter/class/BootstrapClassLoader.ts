import { FieldAccessFlags } from '../../parser/FieldInfoParser'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import { Parser } from '../../parser/Parser'
import { AttributeCode } from '../../parser/types/attributes/AttributeCode'
import { AttributeConstantValue } from '../../parser/types/attributes/AttributeConstantValue'
import { ClassFile } from '../../parser/types/ClassFile'
import { ConstantClass } from '../../parser/types/constants/ConstantClass'
import { ConstantUtf8 } from '../../parser/types/constants/ConstantUtf8'
import { ConstantValueData } from '../../parser/types/constants/ConstantValueData'
import { ReferenceType, PrimitiveType, ClassType, DataType } from '../data-types/data-type'
import { InstructionStream } from '../instructions/InstructionStream'
import { ConstantPool } from '../memory/constant-pool'
import { Runtime } from '../Runtime'
import { MethodObject } from '../util/MethodObject'
import { getTypeFromFieldDescriptor, getTypesFromMethodDescriptor } from '../util/util'
import { ClassLoader } from './ClassLoader'
import { ClassObject } from './ClassObject'
import { ClassObjectManager } from './ClassObjectManager'

export class BootstrapClassLoader extends ClassLoader {
	public load(name: string): ClassObject {
		const className = name.substring(0, name.length - 6)
		if (ClassObjectManager.doesClassExist(className)) {
			return ClassObjectManager.getClass(className)
		}

		const classPath = this.isJDKClass(name) ? `jdk/${name}` : name
		const classFile = new Parser(classPath).getClass()

		const classObject = this.initialize(classFile)

		ClassObjectManager.addClass(classObject)
		this.resolveUnresolvedClasses()

		return classObject
	}

	private initialize(classFile: ClassFile): ClassObject {
		const constantPool = new ConstantPool(classFile.data.header.constantPool)
		const thisClass = constantPool.get(classFile.data.thisClass) as ConstantClass
		const className = (constantPool.get(thisClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')

		let superClass
		if (classFile.data.superClass !== 0) {
			const superClassConstant = this.resolveConstant(classFile, classFile.data.superClass) as ConstantClass
			const superClassName = this.resolveName(classFile, superClassConstant.data.nameIndex)
			superClass = superClassName
			this.addUnresolvedClass(superClassName + '.class')
		}

		const superInterfaces = new Set<string>()
		for (let i = 0; i < classFile.data.interfacesCount; i++) {
			const superInterfaceConstant = this.resolveConstant(classFile, classFile.data.interfaces[i]) as ConstantClass
			const superInterfaceName = this.resolveName(classFile, superInterfaceConstant.data.nameIndex)
			superInterfaces.add(superInterfaceName)
			this.addUnresolvedClass(superInterfaceName + '.class')
		}

		const staticFields = new Map<string, DataType<any>>()
		const fields = new Map<string, DataType<any>>()
		classFile.data.fields.forEach(field => {
			const name = (constantPool.get(field.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const descriptor = (constantPool.get(field.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const value = getTypeFromFieldDescriptor(descriptor)
			if (!value) throw new Error(`Could not read field descriptor for: ${className} -> ${name}, ${descriptor}`)
			if (value instanceof ReferenceType) {
				if (!ClassObjectManager.doesClassExist(className)) {
					this.addUnresolvedClass(className + '.class')
					const address = Runtime.it().allocate(className)
					value.set(address)
				} else {
					const fieldObject = ClassObjectManager.newInstance(className)
					const address = Runtime.it().allocate(fieldObject)
					value.set(address)
				}
			} else if (field.data.attributesCount > 0 && value instanceof PrimitiveType) {
				const attribute = field.data.attributes.find(attribute => attribute instanceof AttributeConstantValue)
				if (attribute) {
					const constant = constantPool.get(attribute.data.constantValueIndex).data as ConstantValueData
					value.set(constant.value)
				}
			}
			if (field.data.accessFlags & FieldAccessFlags.ACC_STATIC) {
				staticFields.set(name, value)
			} else {
				fields.set(name, value)
			}
		})

		const methods = new Map<string, MethodObject>()
		classFile.data.methods.forEach(method => {
			const name = (constantPool.get(method.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const descriptor = (constantPool.get(method.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const methodIdentifier = name + ' ' + descriptor
			const types = getTypesFromMethodDescriptor(descriptor)
			if (types.returnType instanceof ClassType && !ClassObjectManager.doesClassExist(types.returnType.get().getName())) {
				this.addUnresolvedClass(types.returnType.get().getName() + '.class')
			}
			for (const type of types.parameters) {
				if (type instanceof ClassType && !ClassObjectManager.doesClassExist(type.get().getName())) {
					this.addUnresolvedClass(type.get().getName() + '.class')
				}
			}
			if (method.data.accessFlags & MethodAccessFlags.ACC_ABSTRACT) {
				methods.set(methodIdentifier, {
					name,
					className,
					accessFlags: method.data.accessFlags,
					instructionStream: new InstructionStream(''),
					types,
					descriptor,
					maxLocals: 0,
					maxStack: 0
				})
			} else if (method.data.accessFlags & MethodAccessFlags.ACC_NATIVE) {
				methods.set(methodIdentifier, {
					name,
					className,
					accessFlags: method.data.accessFlags,
					instructionStream: new InstructionStream(''),
					types,
					descriptor,
					maxLocals: 0,
					maxStack: 0
				})
			} else {
				const code = method.data.attributes.find(attribute => attribute instanceof AttributeCode)
				if (!(code instanceof AttributeCode)) {
					console.log('code not found', className, name, descriptor)
					return
				}
				const instructionStream = new InstructionStream(name, code.getCode())
				methods.set(methodIdentifier, {
					name,
					className,
					accessFlags: method.data.accessFlags,
					instructionStream,
					types,
					descriptor,
					maxLocals: code.data.maxLocals,
					maxStack: code.data.maxStack
				})
			}
		})

		return new ClassObject(
			className,
			constantPool,
			staticFields,
			fields,
			methods,
			superClass,
			superInterfaces
		)
	}
}
