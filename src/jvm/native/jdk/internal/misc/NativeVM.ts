import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeVM extends NativeClassObject {
	public executeMethod(method: MethodObject, _executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'initialize': {
				this.nativeInitialize()
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeInitialize(): void {}

	public toString(): string {
		return 'native jdk/internal/misc/VM'
	}
}
