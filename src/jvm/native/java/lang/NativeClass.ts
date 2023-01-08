import { map } from 'lodash'
import type { ClassInstance } from '../../../interpreter/class/ClassInstance'
import { ArrayType } from '../../../interpreter/data-types/ArrayType'
import { byte } from '../../../interpreter/data-types/byte'
import { int } from '../../../interpreter/data-types/int'
import { ReferenceType } from '../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { ExecutionManager } from '../../../interpreter/manager/ExecutionManager'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import { HEAP_TYPES } from '../../../interpreter/memory/HeapTypes'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { getTypeNamesFromMethodDescriptor } from '../../../interpreter/util/util'
import { FieldAccessFlags } from '../../../parser/FieldInfoParser'
import { MethodAccessFlags } from '../../../parser/MethodInfoParser'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeClass extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': {
				this.nativeRegisterNatives()
				break
			}
			case 'desiredAssertionStatus0': {
				this.nativeDesiredAssertionStatus0(executionContext)
				break
			}
			case 'getPrimitiveClass': {
				this.nativeGetPrimitiveClass(executionContext)
				break
			}
			case 'isPrimitive': {
				this.nativeIsPrimitive(executionContext)
				break
			}
			case 'forName0': {
				this.nativeForName0(executionContext)
				break
			}
			case 'isInterface': {
				this.nativeIsInterface(executionContext)
				break
			}
			case 'getDeclaredConstructors0': {
				this.nativeGetDeclaredConstructors0(executionContext)
				break
			}
			case 'getModifiers': {
				this.nativeGetModifiers(executionContext)
				break
			}
			case 'getDeclaredFields0': {
				this.nativeGetDeclaredFields0(executionContext)
				break
			}
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
		const stringClass = RuntimeManager.it().load(stringReference) as ClassInstance
		const valueRef = stringClass.getField('value') as ReferenceType
		const valueArray = RuntimeManager.it().load(valueRef) as ArrayType
		const bytes = []
		for (const reference of valueArray.get()) bytes.push(RuntimeManager.it().load(reference) as byte)
		// eslint-disable-next-line no-control-regex
		const string = map(bytes, x => String.fromCharCode(x.get() as number)).join().split(',').join('')
		switch (string) {
			case 'byte': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Byte'))
				break
			}
			case 'char': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Character'))
				break
			}
			case 'double': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Double'))
				break
			}
			case 'float': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Float'))
				break
			}
			case 'int': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Integer'))
				break
			}
			case 'long': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Long'))
				break
			}
			case 'short': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Short'))
				break
			}
			case 'boolean': {
				executionContext.operandStack.push(ClassManager.it().getAssociatedClassObject('java/lang/Boolean'))
				break
			}
		}
	}

	private nativeIsPrimitive(executionContext: ExecutionContext): void {
		const callerClass = RuntimeManager.it().load(executionContext.callerReference) as ClassInstance
		if (callerClass.getName() !== 'java/lang/Class') throw new Error(`Tried calling native System.isPrimitive on ${callerClass.getName()}`)
		const classDataReference = callerClass.getField('classData') as ReferenceType
		const classObject = RuntimeManager.it().load(classDataReference) as ClassInstance
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

	private nativeForName0(executionContext: ExecutionContext): void {
		const stringRef = executionContext.localVariables.get(0) as ReferenceType
		const stringInstance = RuntimeManager.it().load(stringRef) as ClassInstance
		const valueArrayRef = stringInstance.getField('value') as ReferenceType
		const valueArray = RuntimeManager.it().load(valueArrayRef) as ArrayType
		const bytes = []
		for (const reference of valueArray.get()) bytes.push(RuntimeManager.it().load(reference) as byte)
		// eslint-disable-next-line no-control-regex
		const name = map(bytes, x => String.fromCharCode(x.get() as number)).join().split(',').join('').replace(/\x00/g, '').replace(/\./g, '/')
		const initialize = executionContext.localVariables.get(1) as int
		const loaderRef = executionContext.localVariables.get(2) as ReferenceType
		if (loaderRef.get().address) throw new Error(`TODO: NativeClass: forName0: got actual loader ref ${loaderRef}`)
		const callerRef = executionContext.localVariables.get(3) as ReferenceType
		if (callerRef.get().address) throw new Error(`TODO: NativeClass: forName0: got actual caller ref ${callerRef}`)
		const classObject = ClassManager.it().getClass(name)
		if ((initialize.get() as number)) classObject.initializeIfUninitialized()
		const classRef = ClassManager.it().getAssociatedClassObject(name)
		executionContext.operandStack.push(classRef)
	}

	private nativeIsInterface(executionContext: ExecutionContext): void {
		const callerClass = RuntimeManager.it().load(executionContext.callerReference) as ClassInstance
		const classDataReference = callerClass.getField('classData') as ReferenceType
		if (classDataReference.get().address?.getType() === HEAP_TYPES.UNRESOLVED_CLASS_OR_INTERFACE) throw new Error(`NativeClass: isInterface: can not distinguish unloaded class/interface: ${classDataReference}`)
		const isInterface = classDataReference.get().address?.getType() === HEAP_TYPES.INTERFACE
		executionContext.operandStack.push(new int(isInterface ? 1 : 0))
	}

	private nativeGetDeclaredConstructors0(executionContext: ExecutionContext): void {
		const publicOnly = executionContext.localVariables.get(1) as int
		const callerClass = RuntimeManager.it().load(executionContext.callerReference) as ClassInstance
		const classDataReference = callerClass.getField('classData') as ReferenceType
		const classObject = RuntimeManager.it().load(classDataReference) as ClassInstance
		const constructorMethods = classObject.getMethods().filter(method => method.name === '<init>' && (publicOnly ? method.accessFlags & MethodAccessFlags.ACC_PUBLIC : true))
		const constructorObjectArray = new ArrayType(new ReferenceType())
		for (const constructor of constructorMethods) {
			const constructorObject = ClassManager.it().newInstance('java/lang/reflect/Constructor')
			const constructorObjectRef = RuntimeManager.it().allocate(constructorObject)
			ExecutionManager.it().setupExecuteOutOfOrder()
			ExecutionManager.it().setupFunctionCall(constructorObject, '<init>', '(Ljava/lang/Class;[Ljava/lang/Class;[Ljava/lang/Class;IILjava/lang/String;[B[B)V')
			constructorObject.currentMethod().localVariables.set(constructorObjectRef, 0)
			constructorObject.currentMethod().localVariables.set(executionContext.localVariables.get(0), 1)
			const parameterTypesArray = new ArrayType(new ReferenceType(), constructor.types.parameters.length)
			for (const parameter of getTypeNamesFromMethodDescriptor(constructor.descriptor).parameters) {
				parameterTypesArray.get().push(ClassManager.it().getAssociatedClassObject(parameter))
			}
			constructorObject.currentMethod().localVariables.set(RuntimeManager.it().allocate(parameterTypesArray), 2)
			constructorObject.currentMethod().localVariables.set(RuntimeManager.it().allocate(new ArrayType(new ReferenceType(), 0)), 3)
			constructorObject.currentMethod().localVariables.set(new int(constructor.accessFlags), 4)
			constructorObject.currentMethod().localVariables.set(new int(classObject.getMethods().findIndex(method => method === constructor)), 5)
			constructorObject.currentMethod().localVariables.set(RuntimeManager.it().allocate(ClassManager.it().newInstance('java/lang/String')), 6)
			constructorObject.currentMethod().localVariables.set(RuntimeManager.it().allocate(new ArrayType(new byte(), 0)), 7)
			constructorObject.currentMethod().localVariables.set(RuntimeManager.it().allocate(new ArrayType(new byte(), 0)), 8)
			ExecutionManager.it().executeFunctionCall(constructorObject)
			ExecutionManager.it().callExecuteOutOfOrder()
			constructorObjectArray.get().push(constructorObjectRef)
		}
		const constructorObjectArrayRef = RuntimeManager.it().allocate(constructorObjectArray)
		executionContext.operandStack.push(constructorObjectArrayRef)
	}

	private nativeGetModifiers(executionContext: ExecutionContext): void {
		const classRef = executionContext.localVariables.get(0) as ReferenceType
		const classObject = RuntimeManager.it().load(classRef) as ClassInstance
		executionContext.operandStack.push(new int(classObject.getAccessFlags()))
	}

	private nativeGetDeclaredFields0(executionContext: ExecutionContext): void {
		const publicOnly = executionContext.localVariables.get(1) as int
		const callerClass = RuntimeManager.it().load(executionContext.callerReference) as ClassInstance
		const classDataReference = callerClass.getField('classData') as ReferenceType
		const classObject = RuntimeManager.it().load(classDataReference) as ClassInstance
		const fieldObjectArray = new ArrayType(new ReferenceType())
		classObject.getAllFieldsInOrder().forEach(([key, _value, isStatic, signature, modifier], index) => {
			if (publicOnly && !(modifier & FieldAccessFlags.ACC_PUBLIC)) return
			const fieldObject = ClassManager.it().newInstance('java/lang/reflect/Field')
			const fieldObjectRef = RuntimeManager.it().allocate(fieldObject)
			ExecutionManager.it().setupExecuteOutOfOrder()
			ExecutionManager.it().setupFunctionCall(fieldObject, '<init>', '(Ljava/lang/Class;Ljava/lang/String;Ljava/lang/Class;IZILjava/lang/String;[B)V')
			fieldObject.currentMethod().localVariables.set(fieldObjectRef, 0)
			fieldObject.currentMethod().localVariables.set(classDataReference, 1)
			fieldObject.currentMethod().localVariables.set(this.constructStringClass(key), 2)
			fieldObject.currentMethod().localVariables.set(ClassManager.it().getAssociatedClassObject(signature), 3)
			fieldObject.currentMethod().localVariables.set(new int(modifier), 4)
			fieldObject.currentMethod().localVariables.set(new int(0), 5)
			fieldObject.currentMethod().localVariables.set(new int(isStatic ? index - classObject.getFields().size : index), 5)
			fieldObject.currentMethod().localVariables.set(this.constructStringClass(signature), 6)
			fieldObject.currentMethod().localVariables.set(new ArrayType(new byte()), 7)
			ExecutionManager.it().executeFunctionCall(fieldObject)
			ExecutionManager.it().callExecuteOutOfOrder()
			fieldObjectArray.get().push(fieldObjectRef)
		})
		const fieldObjectArrayRef = RuntimeManager.it().allocate(fieldObjectArray)
		executionContext.operandStack.push(fieldObjectArrayRef)
	}

	public toString(): string {
		return 'native java/lang/Class'
	}

	private constructStringClass(text: string): ReferenceType {
		const stringClass = ClassManager.it().newInstance('java/lang/String')
		stringClass.initializeIfUninitialized()
		const stringValue = new ArrayType(new byte())
		for (let i = 0; i < text.length; i++) {
			stringValue.get().push(RuntimeManager.it().allocate(new byte(text.charCodeAt(i))))
		}
		stringClass.putField('value', RuntimeManager.it().allocate(stringValue))
		return RuntimeManager.it().allocate(stringClass)
	}
}
