import { int } from '../../../../interpreter/data-types/int'
import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeFinalizer extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'isFinalizationEnabled': {
				this.nativeIsFinalizationEnabled(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeIsFinalizationEnabled(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(0))
	}

	public toString(): string {
		return 'native java/lang/ref/Finalizer'
	}
}
