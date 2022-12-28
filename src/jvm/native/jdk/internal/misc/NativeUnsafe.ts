import { int } from '../../../../interpreter/data-types/int'
import { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeUnsafe extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': return this.nativeRegisterNatives()
			case 'arrayBaseOffset0': return this.nativeArrayBaseOffset0(executionContext)
			case 'arrayIndexScale0': return this.nativeArrayIndexScale0(executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeArrayBaseOffset0(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(0))
	}

	private nativeArrayIndexScale0(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new int(0))
	}

	public toString(): string {
		return 'native jdk/internal/misc/Unsafe'
	}
}
