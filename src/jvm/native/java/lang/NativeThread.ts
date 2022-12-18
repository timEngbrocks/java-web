import { ClassObjectManager } from '../../../interpreter/class/ClassObjectManager'
import { ReferenceType } from '../../../interpreter/data-types/data-type'
import { Runtime } from '../../../interpreter/Runtime'
import { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeThread extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': return this.nativeRegisterNatives()
			case 'currentThread': return this.nativeCurrentThread(executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeCurrentThread(executionContext: ExecutionContext): void {
		const threadObject = ClassObjectManager.newInstance('java/lang/Thread')
		const address = Runtime.it().allocate(threadObject)
		executionContext.operandStack.push(new ReferenceType(address))
	}

	public toString(): string {
		return 'native java/lang/Thread'
	}
}
