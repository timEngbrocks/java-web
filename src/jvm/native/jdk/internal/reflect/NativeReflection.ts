import type { ClassInstance } from '../../../../interpreter/class/ClassInstance'
import { int } from '../../../../interpreter/data-types/int'
import type { ReferenceType } from '../../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../../interpreter/manager/ClassManager'
import { RuntimeManager } from '../../../../interpreter/manager/RuntimeManager'
import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeReflection extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'getCallerClass': {
				this.nativeGetCallerClass(executionContext)
				break
			}
			case 'getClassAccessFlags': {
				this.nativeGetClassAccessFlags(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeGetCallerClass(executionContext: ExecutionContext): void {
		const callerName = executionContext.methodObject.callerName
		if (!callerName) throw new Error(`NativeReflection: getCallerClass: received empty caller name: ${JSON.stringify(executionContext)}`)
		const callerRef = ClassManager.it().getAssociatedClassObject(callerName)
		executionContext.operandStack.push(callerRef)
	}

	private nativeGetClassAccessFlags(executionContext: ExecutionContext): void {
		const classRef = executionContext.localVariables.get(0) as ReferenceType
		const classObject = RuntimeManager.it().load(classRef) as ClassInstance
		const actualClassRef = classObject.getField('classData') as ReferenceType
		const actualClassObject = RuntimeManager.it().load(actualClassRef) as ClassInstance
		executionContext.operandStack.push(new int(actualClassObject.getAccessFlags()))
	}

	public toString(): string {
		return 'native jdk/internal/reflect/Reflection'
	}
}
