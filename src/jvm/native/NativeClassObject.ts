import { ExecutionContext } from '../interpreter/util/ExecutionContext'
import { MethodObject } from '../interpreter/util/MethodObject'

export abstract class NativeClassObject {
	public abstract executeMethod(method: MethodObject, executionContext: ExecutionContext): void

	public abstract toString(): string
}
