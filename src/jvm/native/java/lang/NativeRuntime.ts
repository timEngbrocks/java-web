import { int } from '../../../interpreter/data-types/int'
import { long } from '../../../interpreter/data-types/long'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeRuntime extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'maxMemory': {
				this.nativeMaxMemory(executionContext)
				break
			}
			case 'availableProcessors': {
				this.nativeAvailableProcessors(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeMaxMemory(executionContext: ExecutionContext): void {
		// FIXME:
		executionContext.operandStack.push(new long(long.MAX))
	}

	private nativeAvailableProcessors(executionContext: ExecutionContext): void {
		// FIXME:
		executionContext.operandStack.push(new int(1))
	}

	public toString(): string {
		return 'native java/lang/Runtime'
	}
}
