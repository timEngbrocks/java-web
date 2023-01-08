import { map } from 'lodash'
import { int } from '../../../../interpreter/data-types/int'
import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'
import type { byte } from '../../../../interpreter/data-types/byte'
import { RuntimeManager } from '../../../../interpreter/manager/RuntimeManager'
import { DirectHeapAddress } from '../../../../interpreter/memory/heap'
import type { long } from '../../../../interpreter/data-types/long'
import type { ReferenceType } from '../../../../interpreter/data-types/ReferenceType'
import { ClassInstance } from '../../../../interpreter/class/ClassInstance'
import { ArrayType } from '../../../../interpreter/data-types/ArrayType'

export class NativeUnsafe extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': {
				this.nativeRegisterNatives()
				break
			}
			case 'arrayBaseOffset0': {
				this.nativeArrayBaseOffset0(executionContext)
				break
			}
			case 'arrayIndexScale0': {
				this.nativeArrayIndexScale0(executionContext)
				break
			}
			case 'objectFieldOffset1': {
				this.nativeObjectFieldOffset1(executionContext)
				break
			}
			case 'fullFence': {
				this.nativeFullFence()
				break
			}
			case 'compareAndSetInt': {
				this.nativeCompareAndSetInt(executionContext)
				break
			}
			case 'getReferenceVolatile': {
				this.nativeGetReferenceVolatile(executionContext)
				break
			}
			case 'compareAndSetReference': {
				this.nativeCompareAndSetReference(executionContext)
				break
			}
			case 'compareAndSetLong': {
				this.nativeCompareAndSetLong(executionContext)
				break
			}
			case 'getLongVolatile': {
				this.nativeGetLongVolatile(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeArrayBaseOffset0(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(0))
	}

	private nativeArrayIndexScale0(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(1))
	}

	private nativeObjectFieldOffset1(executionContext: ExecutionContext): void {
		const associatedClassReference = executionContext.localVariables.get(1) as ReferenceType
		const associatedClass = RuntimeManager.it().load(associatedClassReference) as ClassInstance
		const clazzReference = associatedClass.getField('classData') as ReferenceType
		const clazz = RuntimeManager.it().load(clazzReference) as ClassInstance
		const stringReference = executionContext.localVariables.get(2) as ReferenceType
		const stringClass = RuntimeManager.it().load(stringReference) as ClassInstance
		const valueRef = stringClass.getField('value') as ReferenceType
		const value = RuntimeManager.it().load(valueRef) as ArrayType
		const bytes = []
		for (const reference of value.get()) {
			const byte = RuntimeManager.it().load(reference) as byte
			bytes.push(byte.get() as number)
		}
		const name = map(bytes, x => String.fromCharCode(x)).join().split(',').join('')
		const offset = clazz.getAllFieldsInOrder().findIndex(field => field[0] === name)
		if (offset < 0) throw new Error(`NativeUnsafe: objectFieldOffset1: No field named ${name} on ${clazz.getName()}`)
		executionContext.operandStack.push(new DirectHeapAddress(clazzReference, offset).getEncodedValue())
	}

	private nativeFullFence(): void {}

	private nativeCompareAndSetInt(executionContext: ExecutionContext): void {
		let instanceRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!instanceRef.get().address) instanceRef = decodedDHAValue.reference
		const instance = RuntimeManager.it().load(instanceRef) as ClassInstance
		const expected = executionContext.localVariables.get(4) as int
		const x = executionContext.localVariables.get(5) as int
		if (instance.getName().startsWith('[')) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const array = RuntimeManager.it().load(instance.getField('[value') as ReferenceType) as ArrayType
			const elementRef = array.get()[index]
			const element = RuntimeManager.it().load(elementRef) as int
			if ((element.get() as bigint) === (expected.get() as bigint)) {
				array.get()[index] = RuntimeManager.it().allocate(x)
				instance.putField('[value', array)
				executionContext.operandStack.push(new int(1))
			} else executionContext.operandStack.push(new int(0))
		} else {
			const value = instance.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, int, boolean, string, number]
			if ((value[1].get() as number) === (expected.get() as number)) {
				if (value[2]) instance.putStaticField(value[0], x)
				else instance.putField(value[0], x)
				executionContext.operandStack.push(new int(1))
			} else executionContext.operandStack.push(new int(0))
		}
	}

	private nativeCompareAndSetLong(executionContext: ExecutionContext): void {
		let instanceRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!instanceRef.get().address) instanceRef = decodedDHAValue.reference
		const instance = RuntimeManager.it().load(instanceRef) as ClassInstance
		const expected = executionContext.localVariables.get(4) as long
		const x = executionContext.localVariables.get(6) as long
		if (instance.getName().startsWith('[')) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const array = RuntimeManager.it().load(instance.getField('[value') as ReferenceType) as ArrayType
			const elementRef = array.get()[index]
			const element = RuntimeManager.it().load(elementRef) as long
			if ((element.get() as bigint) === (expected.get() as bigint)) {
				array.get()[index] = RuntimeManager.it().allocate(x)
				instance.putField('[value', array)
				executionContext.operandStack.push(new int(1))
			} else executionContext.operandStack.push(new int(0))
		} else {
			const value = instance.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, long, boolean, string, number]
			if ((value[1].get() as number) === (expected.get() as number)) {
				if (value[2]) instance.putStaticField(value[0], x)
				else instance.putField(value[0], x)
				executionContext.operandStack.push(new int(1))
			} else executionContext.operandStack.push(new int(0))
		}
	}

	private nativeGetReferenceVolatile(executionContext: ExecutionContext): void {
		const arrayRef = executionContext.localVariables.get(1) as ReferenceType
		const array = RuntimeManager.it().load(arrayRef) as ArrayType
		const dhaValue = executionContext.localVariables.get(2) as long
		const index = DirectHeapAddress.getValueSmall(dhaValue)
		executionContext.operandStack.push(array.get()[index])
	}

	private nativeCompareAndSetReference(executionContext: ExecutionContext): void {
		let instanceRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!instanceRef.get().address) instanceRef = decodedDHAValue.reference
		const instance = RuntimeManager.it().load(instanceRef)
		const expected = executionContext.localVariables.get(4) as ReferenceType
		const x = executionContext.localVariables.get(5) as ReferenceType
		if (instance instanceof ClassInstance) {
			if (instance.getName().startsWith('[')) {
				const index = DirectHeapAddress.getValueSmall(dhaValue)
				const array = RuntimeManager.it().load(instance.getField('[value') as ReferenceType) as ArrayType
				const elementRef = array.get()[index]
				if ((elementRef.get().address?.get() as number) === (expected.get().address?.get() as number)) {
					array.get()[index] = x
					instance.putField('[value', array)
					executionContext.operandStack.push(new int(1))
				} else executionContext.operandStack.push(new int(0))
			} else {
				const value = instance.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, ReferenceType, boolean, string, number]
				if ((value[1].get().address?.get() as number) === (expected.get().address?.get() as number)) {
					if (value[2]) instance.putStaticField(value[0], x)
					else instance.putField(value[0], x)
					executionContext.operandStack.push(new int(1))
				} else executionContext.operandStack.push(new int(0))
			}
		} else if (instance instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementRef = instance.get()[index]
			if ((elementRef.get().address?.get() as number) === (expected.get().address?.get() as number)) {
				instance.get()[index] = x
				executionContext.operandStack.push(new int(1))
			} else executionContext.operandStack.push(new int(0))
		} else throw new Error(`NativeUnsafe: compareAndSetReference: instance is neither class nor array: ${JSON.stringify(instance)}`)
	}

	private nativeGetLongVolatile(executionContext: ExecutionContext): void {
		const dhaValue = executionContext.localVariables.get(2) as long
		executionContext.operandStack.push(DirectHeapAddress.getValue(dhaValue) as long)
	}

	public toString(): string {
		return 'native jdk/internal/misc/Unsafe'
	}
}
