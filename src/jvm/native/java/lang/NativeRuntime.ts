import { long } from '../../../interpreter/data-types/long'
import { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeRuntime extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'maxMemory': return this.nativeMaxMemory(executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeMaxMemory(executionContext: ExecutionContext): void {
		executionContext.operandStack.push(new long(long.MAX))
	}

	public toString(): string {
		return 'native java/lang/Runtime'
	}
}
