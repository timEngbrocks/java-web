import type { ClassInstance } from '../../../../interpreter/class/ClassInstance'
import type { ArrayType } from '../../../../interpreter/data-types/ArrayType'
import type { ReferenceType } from '../../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../../interpreter/manager/ClassManager'
import { ExecutionManager } from '../../../../interpreter/manager/ExecutionManager'
import { RuntimeManager } from '../../../../interpreter/manager/RuntimeManager'
import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeDirectConstructorHandleAccessor$NativeAccessor extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'newInstance0': {
				this.nativeNewInstance0(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeNewInstance0(executionContext: ExecutionContext): void {
		const constructorRef = executionContext.localVariables.get(0) as ReferenceType
		const constructorObject = RuntimeManager.it().load(constructorRef) as ClassInstance
		// const argsArrayRef = executionContext.localVariables.get(1) as ReferenceType
		// const argsArray = Runtime.it().load(argsArrayRef) as ArrayType
		const declaringClassRef = constructorObject.getField('clazz') as ReferenceType
		const declaringClassObject = RuntimeManager.it().load(declaringClassRef) as ClassInstance
		const actualDeclaringClassRef = declaringClassObject.getField('classData') as ReferenceType
		const actualDeclaringClassObject = RuntimeManager.it().load(actualDeclaringClassRef) as ClassInstance
		const className = actualDeclaringClassObject.getName()
		const parameterTypesArrayRef = constructorObject.getField('parameterTypes') as ReferenceType
		const parameterTypesArray = RuntimeManager.it().load(parameterTypesArrayRef) as ArrayType
		let descriptor = '('
		if (parameterTypesArray.get().length !== 0) throw new Error('NativeDirectConstructorHandleAccessor$NativeAccessor: newInstance0: use parameters')
		descriptor += ')V'
		const classObject = ClassManager.it().newInstance(className)
		const classRef = RuntimeManager.it().allocate(classObject)
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(classObject, '<init>', descriptor)
		classObject.setLocal(classRef, 0)
		ExecutionManager.it().executeFunctionCall(classObject)
		ExecutionManager.it().callExecuteOutOfOrder()
		executionContext.operandStack.push(classRef)
	}

	public toString(): string {
		return 'native jdk/internal/reflect/DirectConstructorHandleAccessor$NativeAccessor'
	}
}
