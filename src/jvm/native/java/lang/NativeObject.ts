import { ReferenceType } from '../../../interpreter/data-types/data-type'
import { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeObject extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'getClass': return this.nativeGetClass(method, executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeGetClass(method: MethodObject, executionContext: ExecutionContext): void {
		const callerClassReference = executionContext.localVariables.get(0) as ReferenceType
		executionContext.operandStack.push(callerClassReference)
	}

	public toString(): string {
		return 'native java/lang/Object'
	}
}
