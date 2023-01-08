import { FieldAccessFlags } from '../../parser/FieldInfoParser'
import { MethodAccessFlags } from '../../parser/MethodInfoParser'
import { Parser } from '../../parser/Parser'
import { AttributeBootstrapMethods } from '../../parser/types/attributes/AttributeBootstrapMethods'
import { AttributeCode } from '../../parser/types/attributes/AttributeCode'
import { AttributeConstantValue } from '../../parser/types/attributes/AttributeConstantValue'
import { ClassAccessFlag, ClassFile } from '../../parser/types/ClassFile'
import type { ConstantClass } from '../../parser/types/constants/ConstantClass'
import type { ConstantUtf8 } from '../../parser/types/constants/ConstantUtf8'
import type { ConstantValueData } from '../../parser/types/constants/ConstantValueData'
import { ClassType } from '../data-types/ClassType'
import type { DataType } from '../data-types/data-type'
import { PrimitiveType } from '../data-types/PrimitiveType'
import { ReferenceType } from '../data-types/ReferenceType'
import { InstructionStream } from '../instructions/InstructionStream'
import { Interpreter } from '../Interpreter'
import { ConstantPool } from '../memory/constant-pool'
import type { MethodObject } from '../util/MethodObject'
import { getTypeFromFieldDescriptor, getTypesFromMethodDescriptor } from '../util/util'
import { ClassLoader } from './ClassLoader'
import { ClassObject } from './ClassObject'
import { ClassManager, IsClassOrInterface } from '../manager/ClassManager'
import { InterfaceObject } from './InterfaceObject'

export class BootstrapClassLoader extends ClassLoader {
	public loadClassOrInterface(nameWithExtension: string): ClassObject | InterfaceObject {
		const name = nameWithExtension.substring(0, nameWithExtension.length - 6)
		if (ClassManager.it().doesClassExist(name)) {
			return ClassManager.it().getClass(name)
		}
		if (ClassManager.it().doesInterfaceExist(name)) {
			return ClassManager.it().getInterface(name)
		}

		const filePath = this.isJDKClass(nameWithExtension) ? `jdk/${nameWithExtension}` : nameWithExtension
		const classFile = new Parser(filePath).getClass()

		if (classFile.data.header.accessFlags & ClassAccessFlag.ACC_INTERFACE) {
			const interfaceObject = this.initializeInterface(classFile)
			ClassManager.it().addInterface(interfaceObject)
			this.resolveUnresolvedClasses(BootstrapClassLoader)
			return interfaceObject
		} else {
			const classObject = this.initializeClass(classFile)
			ClassManager.it().addClass(classObject)
			this.resolveUnresolvedClasses(BootstrapClassLoader)
			return classObject
		}
	}

	private initializeInterface(classFile: ClassFile): InterfaceObject {
		const constantPool = new ConstantPool(classFile.data.header.constantPool)
		const accessFlags = classFile.data.header.accessFlags
		const thisClass = constantPool.get(classFile.data.thisClass) as ConstantClass
		const interfaceName = (constantPool.get(thisClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		ClassManager.it().addIsClassOrInterface(interfaceName, IsClassOrInterface.INTERFACE)
		const superClass = this.getSuperClass(classFile)
		const superInterfaceNames = this.getSuperInterfaceNames(classFile)
		const { staticFields, staticFieldSignatures, staticFieldModifiers } = this.getFields(classFile, interfaceName)
		const methods = this.getMethods(classFile, interfaceName)
		const bootstrapMethods = this.getBootstrapMethods(classFile)
		const version = this.getVersion(classFile)
		return new InterfaceObject(
			interfaceName,
			constantPool,
			accessFlags,
			staticFields,
			staticFieldSignatures,
			staticFieldModifiers,
			methods,
			superClass,
			superInterfaceNames,
			bootstrapMethods,
			version
		)
	}

	private initializeClass(classFile: ClassFile): ClassObject {
		const constantPool = new ConstantPool(classFile.data.header.constantPool)
		const accessFlags = classFile.data.header.accessFlags
		const thisClass = constantPool.get(classFile.data.thisClass) as ConstantClass
		const className = (constantPool.get(thisClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		ClassManager.it().addIsClassOrInterface(className, IsClassOrInterface.CLASS)
		const superClass = this.getSuperClass(classFile)
		const superInterfaceNames = this.getSuperInterfaceNames(classFile)
		const { staticFields, staticFieldSignatures, staticFieldModifiers, fields, fieldSignatures, fieldModifiers } = this.getFields(classFile, className)
		const methods = this.getMethods(classFile, className)
		const bootstrapMethods = this.getBootstrapMethods(classFile)
		const version = this.getVersion(classFile)
		return new ClassObject(
			className,
			constantPool,
			accessFlags,
			staticFields,
			staticFieldSignatures,
			staticFieldModifiers,
			fields,
			fieldSignatures,
			fieldModifiers,
			methods,
			superClass,
			superInterfaceNames,
			bootstrapMethods,
			version
		)
	}

	private getSuperClass(classFile: ClassFile): string | undefined {
		let superClass
		if (classFile.data.superClass !== 0) {
			const superClassConstant = this.resolveConstant(classFile, classFile.data.superClass) as ConstantClass
			const superClassName = this.resolveName(classFile, superClassConstant.data.nameIndex)
			superClass = superClassName
			this.addUnresolvedClass(superClassName + '.class')
		}
		return superClass
	}

	private getSuperInterfaceNames(classFile: ClassFile): Set<string> {
		const superInterfaceNames = new Set<string>()
		for (let i = 0; i < classFile.data.interfacesCount; i++) {
			const superInterfaceConstant = this.resolveConstant(classFile, classFile.data.interfaces[i]) as ConstantClass
			const superInterfaceName = this.resolveName(classFile, superInterfaceConstant.data.nameIndex)
			superInterfaceNames.add(superInterfaceName)
			this.addUnresolvedClass(superInterfaceName + '.class')
		}
		return superInterfaceNames
	}

	private getFields(classFile: ClassFile, className: string): {
		staticFields: Map<string, DataType<any>>
		staticFieldSignatures: Map<string, string>
		staticFieldModifiers: Map<string, number>
		fields: Map<string, DataType<any>>
		fieldSignatures: Map<string, string>
		fieldModifiers: Map<string, number>
	} {
		const staticFields = new Map<string, DataType<any>>()
		const staticFieldSignatures = new Map<string, string>()
		const staticFieldModifiers = new Map<string, number>()
		const fields = new Map<string, DataType<any>>()
		const fieldSignatures = new Map<string, string>()
		const fieldModifiers = new Map<string, number>()
		classFile.data.fields.forEach(field => {
			const name = (this.resolveConstant(classFile, field.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const descriptor = (this.resolveConstant(classFile, field.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const value = getTypeFromFieldDescriptor(descriptor)
			if (!value) throw new Error(`Could not read field descriptor for: ${className} -> ${name}, ${descriptor}`)
			if (value instanceof ReferenceType && value.get().name.startsWith('[')) {
				const typeName = value.get().name.replace('[', '')
				if (typeName.startsWith('L')) {
					if (!ClassManager.it().doesClassExist(typeName.substring(1))) this.addUnresolvedClass(typeName.substring(1) + '.class')
				}
			} else if (value instanceof ReferenceType) {
				if (!ClassManager.it().doesClassExist(value.get().name)) {
					this.addUnresolvedClass(value.get().name + '.class')
				}
			} else if (field.data.attributesCount > 0 && value instanceof PrimitiveType) {
				const attribute = field.data.attributes.find(attribute => attribute instanceof AttributeConstantValue)
				if (attribute) {
					const constant = this.resolveConstant(classFile, attribute.data.constantValueIndex).data as ConstantValueData
					value.set(constant.value)
				}
			}
			if (field.data.accessFlags & FieldAccessFlags.ACC_STATIC) {
				staticFields.set(name, value)
				staticFieldSignatures.set(name, descriptor)
				staticFieldModifiers.set(name, field.data.accessFlags)
			} else {
				fields.set(name, value)
				fieldSignatures.set(name, descriptor)
				fieldModifiers.set(name, field.data.accessFlags)
			}
		})
		return { staticFields, staticFieldSignatures, staticFieldModifiers, fields, fieldSignatures, fieldModifiers }
	}

	private getMethods(classFile: ClassFile, className: string): Map<string, MethodObject> {
		const methods = new Map<string, MethodObject>()
		classFile.data.methods.forEach(method => {
			const name = (this.resolveConstant(classFile, method.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const descriptor = (this.resolveConstant(classFile, method.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const methodIdentifier = name + ' ' + descriptor
			const types = getTypesFromMethodDescriptor(descriptor)
			if (types.returnType instanceof ClassType && !ClassManager.it().doesClassExist(types.returnType.get().getName())) {
				this.addUnresolvedClass(types.returnType.get().getName() + '.class')
			}
			for (const type of types.parameters) {
				if (type instanceof ClassType && !ClassManager.it().doesClassExist(type.get().getName())) {
					if (Interpreter.globalPC === 134209) console.log('param unresolved')
					this.addUnresolvedClass(type.get().getName() + '.class')
				}
			}
			if (method.data.accessFlags & MethodAccessFlags.ACC_ABSTRACT) {
				methods.set(methodIdentifier, {
					name,
					className,
					callerName: '',
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
					callerName: '',
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
					return
				}
				const instructionStream = new InstructionStream(name, code.getCode())
				methods.set(methodIdentifier, {
					name,
					className,
					callerName: '',
					accessFlags: method.data.accessFlags,
					instructionStream,
					types,
					descriptor,
					maxLocals: code.data.maxLocals,
					maxStack: code.data.maxStack
				})
			}
		})
		return methods
	}

	private getBootstrapMethods(classFile: ClassFile): AttributeBootstrapMethods | undefined {
		return classFile.data.attributes.find(attribute => attribute instanceof AttributeBootstrapMethods)
	}

	private getVersion(classFile: ClassFile): { major: number, minor: number } {
		return {
			major: classFile.data.header.majorVersion,
			minor: classFile.data.header.minorVersion
		}
	}
}
