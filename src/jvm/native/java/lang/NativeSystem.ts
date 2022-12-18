import { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeSystem extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': return this.nativeRegisterNatives()
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	public toString(): string {
		return 'native java/lang/System'
	}
}
