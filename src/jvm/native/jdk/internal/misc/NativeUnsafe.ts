import { map } from 'lodash'
import { int } from '../../../../interpreter/data-types/int'
import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'
import { byte } from '../../../../interpreter/data-types/byte'
import { RuntimeManager } from '../../../../interpreter/manager/RuntimeManager'
import { DirectHeapAddress } from '../../../../interpreter/memory/heap'
import { long } from '../../../../interpreter/data-types/long'
import type { ReferenceType } from '../../../../interpreter/data-types/ReferenceType'
import { ClassInstance } from '../../../../interpreter/class/ClassInstance'
import { ArrayType } from '../../../../interpreter/data-types/ArrayType'
import { short } from '../../../../interpreter/data-types/short'
import { char } from '../../../../interpreter/data-types/char'
import { float } from '../../../../interpreter/data-types/float'
import { double } from '../../../../interpreter/data-types/double'

export class NativeUnsafe extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': {
				this.nativeRegisterNatives()
				break
			}
			case 'getInt': {
				this.nativeGetInt(executionContext)
				break
			}
			case 'putInt': {
				this.nativePutInt(executionContext)
				break
			}
			case 'getReference': {
				this.nativeGetReference(executionContext)
				break
			}
			case 'putReference': {
				this.nativePutReference(executionContext)
				break
			}
			case 'getBoolean': {
				this.nativeGetBoolean(executionContext)
				break
			}
			case 'putBoolean': {
				this.nativePutBoolean(executionContext)
				break
			}
			case 'getByte': {
				this.nativeGetByte(executionContext)
				break
			}
			case 'putByte': {
				this.nativePutByte(executionContext)
				break
			}
			case 'getShort': {
				this.nativeGetShort(executionContext)
				break
			}
			case 'putShort': {
				this.nativePutShort(executionContext)
				break
			}
			case 'getChar': {
				this.nativeGetChar(executionContext)
				break
			}
			case 'putChar': {
				this.nativePutChar(executionContext)
				break
			}
			case 'getLong': {
				this.nativeGetLong(executionContext)
				break
			}
			case 'putLong': {
				this.nativePutLong(executionContext)
				break
			}
			case 'getFloat': {
				this.nativeGetFloat(executionContext)
				break
			}
			case 'putFloat': {
				this.nativePutFloat(executionContext)
				break
			}
			case 'getDouble': {
				this.nativeGetDouble(executionContext)
				break
			}
			case 'putDouble': {
				this.nativePutDouble(executionContext)
				break
			}
			case 'getUncompressedObject': {
				this.nativeGetUncompressedObject(executionContext)
				break
			}
			case 'writeback0': {
				this.nativeWriteback0(executionContext)
				break
			}
			case 'writebackPreSync0': {
				this.nativeWritebackPreSync0(executionContext)
				break
			}
			case 'writebackPostSync0': {
				this.nativeWritebackPostSync0(executionContext)
				break
			}
			case 'defineClass0': {
				this.nativeDefineClass0(executionContext)
				break
			}
			case 'allocateInstance': {
				this.nativeAllocateInstance(executionContext)
				break
			}
			case 'throwException': {
				this.nativeThrowException(executionContext)
				break
			}
			case 'compareAndSetReference': {
				this.nativeCompareAndSetReference(executionContext)
				break
			}
			case 'compareAndExchangeReference': {
				this.nativeCompareAndExchangeReference(executionContext)
				break
			}
			case 'compareAndSetInt': {
				this.nativeCompareAndSetInt(executionContext)
				break
			}
			case 'compareAndExchangeInt': {
				this.nativeCompareAndExchangeInt(executionContext)
				break
			}
			case 'compareAndSetLong': {
				this.nativeCompareAndSetLong(executionContext)
				break
			}
			case 'compareAndExchangeLong': {
				this.nativeCompareAndExchangeLong(executionContext)
				break
			}
			case 'getReferenceVolatile': {
				this.nativeGetReferenceVolatile(executionContext)
				break
			}
			case 'putReferenceVolatile': {
				this.nativePutReferenceVolatile(executionContext)
				break
			}
			case 'getIntVolatile': {
				this.nativeGetIntVolatile(executionContext)
				break
			}
			case 'putIntVolatile': {
				this.nativePutIntVolatile(executionContext)
				break
			}
			case 'getBooleanVolatile': {
				this.nativeGetBooleanVolatile(executionContext)
				break
			}
			case 'putBooleanVolatile': {
				this.nativePutBooleanVolatile(executionContext)
				break
			}
			case 'getByteVolatile': {
				this.nativeGetByteVolatile(executionContext)
				break
			}
			case 'putByteVolatile': {
				this.nativePutByteVolatile(executionContext)
				break
			}
			case 'getShortVolatile': {
				this.nativeGetShortVolatile(executionContext)
				break
			}
			case 'putShortVolatile': {
				this.nativePutShortVolatile(executionContext)
				break
			}
			case 'getCharVolatile': {
				this.nativeGetCharVolatile(executionContext)
				break
			}
			case 'putCharVolatile': {
				this.nativePutCharVolatile(executionContext)
				break
			}
			case 'getLongVolatile': {
				this.nativeGetLongVolatile(executionContext)
				break
			}
			case 'putLongVolatile': {
				this.nativePutLongVolatile(executionContext)
				break
			}
			case 'getFloatVolatile': {
				this.nativeGetFloatVolatile(executionContext)
				break
			}
			case 'putFloatVolatile': {
				this.nativePutFloatVolatile(executionContext)
				break
			}
			case 'getDoubleVolatile': {
				this.nativeGetDoubleVolatile(executionContext)
				break
			}
			case 'putDoubleVolatile': {
				this.nativePutDoubleVolatile(executionContext)
				break
			}
			case 'unpark': {
				this.nativeUnpark(executionContext)
				break
			}
			case 'park': {
				this.nativePark(executionContext)
				break
			}
			case 'fullFence': {
				this.nativeFullFence()
				break
			}
			case 'allocateMemory0': {
				this.nativeAllocateMemory0(executionContext)
				break
			}
			case 'reallocateMemory0': {
				this.nativeReallocateMemory0(executionContext)
				break
			}
			case 'freeMemory0': {
				this.nativeFreeMemory0(executionContext)
				break
			}
			case 'setMemory0': {
				this.nativeSetMemory0(executionContext)
				break
			}
			case 'copyMemory0': {
				this.nativeCopyMemory0(executionContext)
				break
			}
			case 'copySwapMemory0': {
				this.nativeCopySwapMemory0(executionContext)
				break
			}
			case 'objectFieldOffset0': {
				this.nativeObjectFieldOffset0(executionContext)
				break
			}
			case 'objectFieldOffset1': {
				this.nativeObjectFieldOffset1(executionContext)
				break
			}
			case 'staticFieldOffset0': {
				this.nativeStaticFieldOffset0(executionContext)
				break
			}
			case 'staticFieldBase0': {
				this.nativeStaticFieldBase0(executionContext)
				break
			}
			case 'shouldBeInitialized0': {
				this.nativeShouldBeInitialized0(executionContext)
				break
			}
			case 'ensureClassInitialized0': {
				this.nativeEnsureClassInitialized0(executionContext)
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
			case 'getLoadAverage0': {
				this.nativeGetLoadAverage0(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeGetInt(executionContext: ExecutionContext): void {
		const returnValue = new int()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, int, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as int
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutInt(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as int
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, int, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetReference(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, ReferenceType, boolean, string, number]
			executionContext.operandStack.push(value[1])
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			executionContext.operandStack.push(elementReference)
		}
	}

	private nativePutReference(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as ReferenceType
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, ReferenceType, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = x
		}
	}

	private nativeGetBoolean(executionContext: ExecutionContext): void {
		const returnValue = new int()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, int, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as int
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutBoolean(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as int
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, int, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetByte(executionContext: ExecutionContext): void {
		const returnValue = new byte()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, byte, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as byte
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutByte(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as byte
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, byte, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetShort(executionContext: ExecutionContext): void {
		const returnValue = new short()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, short, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as short
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutShort(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as short
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, short, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetChar(executionContext: ExecutionContext): void {
		const returnValue = new char()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, char, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as char
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutChar(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as char
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, char, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetLong(executionContext: ExecutionContext): void {
		const returnValue = new long()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, long, boolean, string, number]
			returnValue.set(value[1].get() as bigint)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as long
			returnValue.set(element.get() as bigint)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutLong(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, long, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetFloat(executionContext: ExecutionContext): void {
		const returnValue = new float()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, float, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as float
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutFloat(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as float
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, float, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetDouble(executionContext: ExecutionContext): void {
		const returnValue = new double()
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, double, boolean, string, number]
			returnValue.set(value[1].get() as number)
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			const elementReference = object.get()[index]
			const element = RuntimeManager.it().load(elementReference) as double
			returnValue.set(element.get() as number)
		}
		executionContext.operandStack.push(returnValue)
	}

	private nativePutDouble(executionContext: ExecutionContext): void {
		let objectRef = executionContext.localVariables.get(1) as ReferenceType
		const dhaValue = executionContext.localVariables.get(2) as long
		const x = executionContext.localVariables.get(4) as double
		const decodedDHAValue = DirectHeapAddress.decode(dhaValue)
		if (!objectRef.get().address) objectRef = decodedDHAValue.reference
		const object = RuntimeManager.it().load(objectRef)
		if (object instanceof ClassInstance) {
			const value = object.getAllFieldsInOrder()[decodedDHAValue.fieldOffset] as [string, double, boolean, string, number]
			value[1] = x
		} else if (object instanceof ArrayType) {
			const index = DirectHeapAddress.getValueSmall(dhaValue)
			object.get()[index] = RuntimeManager.it().allocate(x)
		}
	}

	private nativeGetUncompressedObject(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeGetUncompressedObject')
	}

	private nativeWriteback0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeWriteback0')
	}

	private nativeWritebackPreSync0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeWritebackPreSync0')
	}

	private nativeWritebackPostSync0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeWritebackPostSync0')
	}

	private nativeDefineClass0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeDefineClass0')
	}

	private nativeAllocateInstance(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeAllocateInstance')
	}

	private nativeThrowException(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeThrowException')
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

	private nativeCompareAndExchangeReference(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeCompareAndExchangeReference')
	}

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

	private nativeCompareAndExchangeInt(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeCompareAndExchangeInt')
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

	private nativeCompareAndExchangeLong(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeCompareAndExchangeLong')
	}

	private nativeGetReferenceVolatile(executionContext: ExecutionContext): void {
		this.nativeGetReference(executionContext)
	}

	private nativePutReferenceVolatile(executionContext: ExecutionContext): void {
		this.nativePutReference(executionContext)
	}

	private nativeGetIntVolatile(executionContext: ExecutionContext): void {
		this.nativeGetInt(executionContext)
	}

	private nativePutIntVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutIntVolatile')
	}

	private nativeGetBooleanVolatile(executionContext: ExecutionContext): void {
		this.nativeGetBoolean(executionContext)
	}

	private nativePutBooleanVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutBooleanVolatile')
	}

	private nativeGetByteVolatile(executionContext: ExecutionContext): void {
		this.nativeGetByte(executionContext)
	}

	private nativePutByteVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutByteVolatile')
	}

	private nativeGetShortVolatile(executionContext: ExecutionContext): void {
		this.nativeGetShort(executionContext)
	}

	private nativePutShortVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutShortVolatile')
	}

	private nativeGetCharVolatile(executionContext: ExecutionContext): void {
		this.nativeGetChar(executionContext)
	}

	private nativePutCharVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutCharVolatile')
	}

	private nativeGetLongVolatile(executionContext: ExecutionContext): void {
		this.nativeGetLong(executionContext)
	}

	private nativePutLongVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutLongVolatile')
	}

	private nativeGetFloatVolatile(executionContext: ExecutionContext): void {
		this.nativeGetFloat(executionContext)
	}

	private nativePutFloatVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutFloatVolatile')
	}

	private nativeGetDoubleVolatile(executionContext: ExecutionContext): void {
		this.nativeGetDouble(executionContext)
	}

	private nativePutDoubleVolatile(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePutDoubleVolatile')
	}

	private nativeUnpark(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeUnpark')
	}

	private nativePark(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativePark')
	}

	private nativeFullFence(): void {}

	private nativeAllocateMemory0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeAllocateMemory0')
	}

	private nativeReallocateMemory0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeReallocateMemory0')
	}

	private nativeFreeMemory0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeFreeMemory0')
	}

	private nativeSetMemory0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeSetMemory0')
	}

	private nativeCopyMemory0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeCopyMemory0')
	}

	private nativeCopySwapMemory0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeCopySwapMemory0')
	}

	private nativeObjectFieldOffset0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeObjectFieldOffset0')
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

	private nativeStaticFieldOffset0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeStaticFieldOffset0')
	}

	private nativeStaticFieldBase0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeStaticFieldBase0')
	}

	private nativeShouldBeInitialized0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeShouldBeInitialized0')
	}

	private nativeEnsureClassInitialized0(executionContext: ExecutionContext): void {
		const classReference = executionContext.localVariables.get(1) as ReferenceType
		const clazz = RuntimeManager.it().load(classReference) as ClassInstance
		const classDataReference = clazz.getField('classData') as ReferenceType
		const classObject = RuntimeManager.it().load(classDataReference) as ClassInstance
		classObject.initializeIfUninitialized()
		executionContext.operandStack.push(new int(1))
	}

	private nativeArrayBaseOffset0(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(0))
	}

	private nativeArrayIndexScale0(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(1))
	}

	private nativeGetLoadAverage0(_executionContext: ExecutionContext): void {
		throw new Error('NativeUnsafe: not implemented: nativeGetLoadAverage0')
	}

	public toString(): string {
		return 'native jdk/internal/misc/Unsafe'
	}
}
