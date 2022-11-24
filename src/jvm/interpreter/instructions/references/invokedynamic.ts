/* eslint-disable */
import { CPInfoTypes } from '../../../class-loader/parser/CPInfo.parser'
import { ConstantDouble } from '../../../class-loader/parser/types/constants/ConstantDouble'
import { ConstantFieldRef } from '../../../class-loader/parser/types/constants/ConstantFieldRef'
import { ConstantFloat } from '../../../class-loader/parser/types/constants/ConstantFloat'
import { ConstantInteger } from '../../../class-loader/parser/types/constants/ConstantInteger'
import { ConstantInterfaceMethodRef } from '../../../class-loader/parser/types/constants/ConstantInterfaceMethodRef'
import { ConstantInvokeDynamic } from '../../../class-loader/parser/types/constants/ConstantInvokeDynamic'
import { ConstantLong } from '../../../class-loader/parser/types/constants/ConstantLong'
import { ConstantMethodHandle, MethodHandleReferenceKind } from '../../../class-loader/parser/types/constants/ConstantMethodHandle'
import { ConstantMethodRef } from '../../../class-loader/parser/types/constants/ConstantMethodRef'
import { ConstantNameAndType } from '../../../class-loader/parser/types/constants/ConstantNameAndType'
import { ConstantString } from '../../../class-loader/parser/types/constants/ConstantString'
import { ConstantUtf8 } from '../../../class-loader/parser/types/constants/ConstantUtf8'
import { CPInfo } from '../../../class-loader/parser/types/CPInfo'
import { ClassObject } from '../../ClassObject'
import { classType } from '../../data-types/classType'
import { DescriptorType } from '../../data-types/data-type'
import { Instruction } from '../../Instruction'
import { InstructionStream } from '../../InstructionStream'
import { Frame } from '../../memory/frame'
import { HeapAddress } from '../../memory/heap'
import { Runtime } from '../../Runtime'
import { getTypeFromFieldDescriptor, getTypesFromMethodDescriptor } from '../../util'
import { dreturn, freturn, ireturn, lreturn } from '../control/xreturn'
import { dload, fload, iload, lload } from '../loads/xload'

export class invokedynamic extends Instruction {
	length = 5
	args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	public override execute(): void {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const invokeDynamic = Runtime.getConstant(index)
		if (!(invokeDynamic instanceof ConstantInvokeDynamic)) throw 'Tried invokedynamic without constant invoke dynamic'
		const bootstrapMethodAttribute = Runtime.getBootstrapMethod(invokeDynamic.data.bootstrapMethodAttrIndex)
		const bootstrapMethod = Runtime.getConstant(bootstrapMethodAttribute.bootstrapMethodRef) as ConstantMethodHandle
		const bootstrapMethodKind = bootstrapMethod.data.referenceKind

		if (this.isFieldResolution(bootstrapMethodKind)) {
			const field = Runtime.getConstant(bootstrapMethod.data.referenceIndex) as ConstantFieldRef
			const nameAndType = Runtime.getConstant(field.data.nameAndTypeIndex) as ConstantNameAndType
			const descriptor = (Runtime.getConstant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const type = getTypeFromFieldDescriptor(descriptor)
		} else if (this.isMethodResolution(bootstrapMethodKind)) {
			const method = Runtime.getConstant(bootstrapMethod.data.referenceIndex) as ConstantMethodRef
			const nameAndType = Runtime.getConstant(method.data.nameAndTypeIndex) as ConstantNameAndType
			const descriptor = (Runtime.getConstant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const types = getTypesFromMethodDescriptor(descriptor)
		} else if (this.isInterfaceMethodResoultion(bootstrapMethodKind)) {
			const interfaceMethod = Runtime.getConstant(bootstrapMethod.data.referenceIndex) as ConstantInterfaceMethodRef
			const nameAndType = Runtime.getConstant(interfaceMethod.data.nameAndTypeIndex) as ConstantNameAndType
			const descriptor = (Runtime.getConstant(nameAndType.data.descriptorIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
			const types = getTypesFromMethodDescriptor(descriptor)
		}

		/* bootstrapMethodAttribute.bootstrapArguments.map<HeapAddress>((argumentIndex: number): HeapAddress => {
            const bootstrapArgument = Runtime.getConstant(argumentIndex) as CPInfo<any>
            switch (bootstrapArgument.data.tag) {
                case CPInfoTypes.CONSTANT_String: {
                    const text = (Runtime.getConstant((bootstrapArgument as ConstantString).data.stringIndex) as ConstantUtf8).data.bytes.toString()
                    const classObject = Runtime.classes.find(clazz => clazz.name == 'java/lang/String') as ClassObject
                    break
                }
                case CPInfoTypes.CONSTANT_Integer: {
                    const fieldDescriptor = 'I'
                    const fieldType = getTypeFromFieldDescriptor(fieldDescriptor) as DescriptorType
                    const value = (bootstrapArgument as ConstantInteger).data.value
                    const methodHandle = new ClassObject()
                    methodHandle.name = 'java/lang/invoke/MethodHandle'
                    const iloadInstruction = iload
                    iloadInstruction.setArgs(value.toString(16))
                    methodHandle.methods = [
                        {
                            name: 'invoke',
                            activeFrame: new Frame('', 0, 0),
                            activeInstructionStream: InstructionStream.create('invoke', [
                                iloadInstruction,
                                ireturn,
                            ]),
                            types: {
                                parameters: [fieldType],
                                returnType: classType
                            }
                        }
                    ]
                    return Runtime.allocate(methodHandle)
                }
                case CPInfoTypes.CONSTANT_Long: {
                    const fieldDescriptor = 'J'
                    const fieldType = getTypeFromFieldDescriptor(fieldDescriptor) as DescriptorType
                    const value = (bootstrapArgument as ConstantLong).data.value
                    const methodHandle = new ClassObject()
                    methodHandle.name = 'java/lang/invoke/MethodHandle'
                    const lloadInstruction = lload
                    lloadInstruction.setArgs(value.toString(16))
                    methodHandle.methods = [
                        {
                            name: 'invoke',
                            activeFrame: new Frame('', 0, 0),
                            activeInstructionStream: InstructionStream.create('invoke', [
                                lloadInstruction,
                                lreturn,
                            ]),
                            types: {
                                parameters: [fieldType],
                                returnType: classType
                            }
                        }
                    ]
                    return Runtime.allocate(methodHandle)
                }
                case CPInfoTypes.CONSTANT_Float: {
                    const fieldDescriptor = 'F'
                    const fieldType = getTypeFromFieldDescriptor(fieldDescriptor) as DescriptorType
                    const value = (bootstrapArgument as ConstantFloat).data.value
                    const methodHandle = new ClassObject()
                    methodHandle.name = 'java/lang/invoke/MethodHandle'
                    const floadInstruction = fload
                    floadInstruction.setArgs(value.toString(16))
                    methodHandle.methods = [
                        {
                            name: 'invoke',
                            activeFrame: new Frame('', 0, 0),
                            activeInstructionStream: InstructionStream.create('invoke', [
                                floadInstruction,
                                freturn,
                            ]),
                            types: {
                                parameters: [fieldType],
                                returnType: classType
                            }
                        }
                    ]
                    return Runtime.allocate(methodHandle)
                }
                case CPInfoTypes.CONSTANT_Double: {
                    const fieldDescriptor = 'D'
                    const fieldType = getTypeFromFieldDescriptor(fieldDescriptor) as DescriptorType
                    const value = (bootstrapArgument as ConstantDouble).data.value
                    const methodHandle = new ClassObject()
                    methodHandle.name = 'java/lang/invoke/MethodHandle'
                    const dloadInstruction = dload
                    dloadInstruction.setArgs(value.toString(16))
                    methodHandle.methods = [
                        {
                            name: 'invoke',
                            activeFrame: new Frame('', 0, 0),
                            activeInstructionStream: InstructionStream.create('invoke', [
                                dloadInstruction,
                                dreturn,
                            ]),
                            types: {
                                parameters: [fieldType],
                                returnType: classType
                            }
                        }
                    ]
                    return Runtime.allocate(methodHandle)
                }
                case CPInfoTypes.CONSTANT_Dynamic: {
                    break
                }
            }
            // TODO: default
        }) */
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		return `invokedynamic @ ${index}`
	}

	private isFieldResolution(bootstrapMethodKind: MethodHandleReferenceKind): boolean {
		return bootstrapMethodKind == MethodHandleReferenceKind.REF_getField ||
                bootstrapMethodKind == MethodHandleReferenceKind.REF_getStatic ||
                bootstrapMethodKind == MethodHandleReferenceKind.REF_putField ||
                bootstrapMethodKind == MethodHandleReferenceKind.REF_putStatic
	}

	private isMethodResolution(bootstrapMethodKind: MethodHandleReferenceKind): boolean {
		return bootstrapMethodKind == MethodHandleReferenceKind.REF_invokeVirtual ||
                bootstrapMethodKind == MethodHandleReferenceKind.REF_invokeStatic ||
                bootstrapMethodKind == MethodHandleReferenceKind.REF_invokeSpecial ||
                bootstrapMethodKind == MethodHandleReferenceKind.REF_newInvokeSpecial
	}

	private isInterfaceMethodResoultion(bootstrapMethodKind: MethodHandleReferenceKind): boolean {
		return bootstrapMethodKind == MethodHandleReferenceKind.REF_invokeInterface
	}
}
