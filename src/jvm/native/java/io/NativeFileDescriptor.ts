import { int } from '../../../interpreter/data-types/int'
import { long } from '../../../interpreter/data-types/long'
import { FileManager } from '../../../interpreter/manager/FileManager'
import { FileAccessMode } from '../../../interpreter/memory/FileTable'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeFileDescriptor extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'initIDs': {
				this.nativeInitIDs()
				break
			}
			case 'getHandle': {
				this.nativeGetHandle(executionContext)
				break
			}
			case 'getAppend': {
				this.nativeGetAppend(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeInitIDs(): void {}

	private nativeGetHandle(executionContext: ExecutionContext): void {
		const d = executionContext.localVariables.get(0) as int
		const handle = FileManager.it().allocateFD(d.get() as number)
		executionContext.operandStack.push(new long(handle))
	}

	private nativeGetAppend(executionContext: ExecutionContext): void {
		const fd = executionContext.localVariables.get(0) as int
		const accessMode = FileManager.it().getAccessMode(fd.get() as number)
		executionContext.operandStack.push(new int(accessMode & FileAccessMode.APPEND ? 1 : 0))
	}

	public toString(): string {
		return 'native java/io/FileDescriptor'
	}
}
