import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeWinNTFileSystem extends NativeClassObject {
	public override executeMethod(method: MethodObject, _executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'initIDs': {
				this.nativeInitIDs()
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeInitIDs(): void {}

	public override toString(): string {
		return 'native java/io/WinNTFileSystem'
	}
}
