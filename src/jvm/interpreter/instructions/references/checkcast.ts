import { ConstantClass } from '../../../parser/types/constants/ConstantClass'
import type { ConstantUtf8 } from '../../../parser/types/constants/ConstantUtf8'
import { ClassInstance } from '../../class/ClassInstance'
import { InterfaceObject } from '../../class/InterfaceObject'
import { ArrayType } from '../../data-types/ArrayType'
import { ReferenceType } from '../../data-types/ReferenceType'
import { ClassManager } from '../../manager/ClassManager'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { constructArrayFromArrayClassName } from '../../util/util'
import { Instruction } from '../Instruction'

export class checkcast extends Instruction {
	override length = 3
	override args = ''
	public override setArgs(args: string): void {
		this.args = args
	}

	// FIXME: throw java exception
	// FIXME: interfaces
	public override execute(): void {
		const sObjectRef = RuntimeManager.it().pop() as ReferenceType
		RuntimeManager.it().push(sObjectRef)
		if (!sObjectRef.get().address) {
			return
		}
		const sObject = RuntimeManager.it().load(sObjectRef) as (ClassInstance | InterfaceObject | ArrayType)
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const tClass = RuntimeManager.it().constant(index) as ConstantClass
		const tName = (RuntimeManager.it().constant(tClass.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		let tObject
		if (ClassManager.it().isClass(tName)) tObject = ClassManager.it().newInstance(tName)
		else if (ClassManager.it().isInterface(tName)) tObject = ClassManager.it().getInterface(tName)
		else tObject = constructArrayFromArrayClassName(tName)
		// eslint-disable-next-line @typescript-eslint/no-base-to-string
		if (!this.canCast(sObject, tObject)) throw new Error(`checkcast: Can not cast: ${sObject.toString()} to ${tObject}`)
	}

	public override toString(): string {
		const indexbyte1 = Number.parseInt(this.args.substring(0, 2), 16)
		const indexbyte2 = Number.parseInt(this.args.substring(2, 4), 16)
		const index = (indexbyte1 << 8) | indexbyte2
		const classObject = RuntimeManager.it().constant(index) as ConstantClass
		const name = (RuntimeManager.it().constant(classObject.data.nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
		return `checkcast -> ${name}`
	}

	private canCast(sObject: ClassInstance | InterfaceObject | ArrayType, tObject: ClassInstance | InterfaceObject | ArrayType): boolean {
		if (sObject instanceof ClassInstance) {
			if (tObject instanceof ClassInstance) {
				const tName = tObject.getName()
				if (sObject.getName() !== tName) {
					let sSuper = sObject.getSuperClass()
					while (sSuper) {
						if (sSuper.getName() === tName) return true
						else {
							sSuper = sSuper.getSuperClass()
						}
					}
					return false
				}
				return true
			} else if (tObject instanceof InterfaceObject) {
				if (!sObject.hasSuperInterface(tObject)) {
					let sSuper = sObject.getSuperClass()
					while (sSuper) {
						if (sSuper.hasSuperInterface(tObject)) return true
						else {
							sSuper = sSuper.getSuperClass()
						}
					}
					return false
				}
				return true
			}
			return false
		} else if (sObject instanceof ArrayType) {
			const sComponentType = sObject.type
			if (tObject instanceof ArrayType) {
				const tComponentType = tObject.type
				if (!(tComponentType instanceof ReferenceType || sComponentType instanceof ReferenceType)) {
					// FIXME: This is stupid
					if (tComponentType.toString() !== sComponentType.toString()) return false
				} else if (tComponentType instanceof ReferenceType && sComponentType instanceof ReferenceType) {
					throw new Error(`checkcast: TODO impl array ref cast: ${sComponentType} to ${tComponentType}`)
				} else return false
			} else if (tObject instanceof ConstantClass) {
				if (tObject.getName() !== 'java/lang/Object') return false
			}
		} else return false
		return true
	}
}
