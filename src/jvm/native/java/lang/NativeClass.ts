import { map } from 'lodash'
import { ClassInstance } from '../../../interpreter/class/ClassInstance'
import { ClassObjectManager } from '../../../interpreter/class/ClassObjectManager'
import { byte } from '../../../interpreter/data-types/byte'
import { ArrayType, ReferenceType } from '../../../interpreter/data-types/data-type'
import { int } from '../../../interpreter/data-types/int'
import { Runtime } from '../../../interpreter/Runtime'
import { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeClass extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': return this.nativeRegisterNatives()
			case 'desiredAssertionStatus0': return this.nativeDesiredAssertionStatus0(executionContext)
			case 'getPrimitiveClass': return this.nativeGetPrimitiveClass(executionContext)
			case 'isPrimitive': return this.nativeIsPrimitive(executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeDesiredAssertionStatus0(executionContext: ExecutionContext): void {
		// FIXME: Return actual assertion status
		// const clazz = executionContext.localVariables.get(0)
		executionContext.operandStack.push(new int(0))
	}

	private nativeGetPrimitiveClass(executionContext: ExecutionContext): void {
		const stringReference = executionContext.localVariables.get(0) as ReferenceType
		const stringClass = Runtime.it().load(stringReference) as ClassInstance
		const valueRef = stringClass.getField('value') as ReferenceType
		const value = Runtime.it().load(valueRef) as ArrayType
		const bytes = []
		for (const reference of value.get()) {
			const byte = Runtime.it().load(reference) as byte
			bytes.push(byte.get() as number)
		}
		const string = map(bytes, x => String.fromCharCode(x)).join().split(',').join('')
		switch (string) {
			case 'byte': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Byte'))
				break
			}
			case 'char': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Character'))
				break
			}
			case 'double': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Double'))
				break
			}
			case 'float': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Float'))
				break
			}
			case 'int': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Integer'))
				break
			}
			case 'long': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Long'))
				break
			}
			case 'short': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Short'))
				break
			}
			case 'boolean': {
				executionContext.operandStack.push(ClassObjectManager.getAssociatedClassObject('java/lang/Boolean'))
				break
			}
		}
	}

	private nativeIsPrimitive(executionContext: ExecutionContext): void {
		if (executionContext.class.getName() !== 'java/lang/Class') throw new Error(`Tried calling native System.isPrimitive on ${executionContext.class.getName()}`)
		const classDataReference = (executionContext.class as ClassInstance).getField('classData') as ReferenceType
		const classObject = Runtime.it().load(classDataReference) as ClassInstance
		const isPrimitive = classObject.getName() === 'java/lang/Boolean' ||
				classObject.getName() === 'java/lang/Character' ||
				classObject.getName() === 'java/lang/Byte' ||
				classObject.getName() === 'java/lang/Short' ||
				classObject.getName() === 'java/lang/Integer' ||
				classObject.getName() === 'java/lang/Long' ||
				classObject.getName() === 'java/lang/Float' ||
				classObject.getName() === 'java/lang/Double' ||
				classObject.getName() === 'java/lang/Void'
		executionContext.operandStack.push(isPrimitive ? new int(1) : new int(0))
	}

	public toString(): string {
		return 'native java/lang/System'
	}
}
