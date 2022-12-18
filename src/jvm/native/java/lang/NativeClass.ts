import { map } from 'lodash'
import { ClassInstance } from '../../../interpreter/class/ClassInstance'
import { byte } from '../../../interpreter/data-types/byte'
import { char } from '../../../interpreter/data-types/char'
import { ArrayType, ReferenceType } from '../../../interpreter/data-types/data-type'
import { double } from '../../../interpreter/data-types/double'
import { float } from '../../../interpreter/data-types/float'
import { int } from '../../../interpreter/data-types/int'
import { long } from '../../../interpreter/data-types/long'
import { short } from '../../../interpreter/data-types/short'
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
		const stringClass = Runtime.it().load(stringReference.get()!) as ClassInstance
		const valueRef = stringClass.getField('value') as ReferenceType
		const value = Runtime.it().load(valueRef.get()!) as ArrayType
		const bytes = []
		for (const reference of value.get()) {
			const byte = Runtime.it().load(reference.get()!) as byte
			bytes.push(byte.get() as number)
		}
		const string = map(bytes, x => String.fromCharCode(x)).join().split(',').join('')
		switch (string) {
			case 'byte': {
				executionContext.operandStack.push(new byte())
				break
			}
			case 'char': {
				executionContext.operandStack.push(new char())
				break
			}
			case 'double': {
				executionContext.operandStack.push(new double())
				break
			}
			case 'float': {
				executionContext.operandStack.push(new float())
				break
			}
			case 'int': {
				executionContext.operandStack.push(new int())
				break
			}
			case 'long': {
				executionContext.operandStack.push(new long())
				break
			}
			case 'short': {
				executionContext.operandStack.push(new short())
				break
			}
			case 'boolean': {
				executionContext.operandStack.push(new int())
				break
			}
		}
	}

	public toString(): string {
		return 'native java/lang/System'
	}
}
