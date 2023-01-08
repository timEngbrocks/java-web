import { int } from '../../../interpreter/data-types/int'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { ExecutionManager } from '../../../interpreter/manager/ExecutionManager'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import { ThreadManager } from '../../../interpreter/manager/ThreadManager'
import { DirectHeapAddress } from '../../../interpreter/memory/heap'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeThread extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': {
				this.nativeRegisterNatives()
				break
			}
			case 'currentThread': {
				this.nativeCurrentThread(executionContext)
				break
			}
			case 'getNextThreadIdOffset': {
				this.nativeGetNextThreadIdOffset(executionContext)
				break
			}
			case 'setPriority0': {
				this.nativeSetPriority0(executionContext)
				break
			}
			case 'isAlive0': {
				this.nativeIsAlive0(executionContext)
				break
			}
			case 'start0': {
				this.nativeStart0()
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeCurrentThread(executionContext: ExecutionContext): void {
		const thread = ThreadManager.it().getPrimoridalThread()
		executionContext.operandStack.push(thread.getThreadReference())
	}

	private nativeGetNextThreadIdOffset(executionContext: ExecutionContext): void {
		const instance = ClassManager.it().newInstance('java/lang/Thread$ThreadIdentifiers')
		const reference = RuntimeManager.it().allocate(instance)
		const fields = instance.getAllFieldsInOrder()
		const offset = fields.findIndex(([key, _value]) => key === 'NEXT_TID_OFFSET')
		executionContext.operandStack.push(new DirectHeapAddress(reference, offset).getEncodedValue())
	}

	private nativeSetPriority0(executionContext: ExecutionContext): void {
		const newPriority = executionContext.localVariables.get(1) as int
		ExecutionManager.it().getThread().setPriority(newPriority.get() as number)
	}

	private nativeIsAlive0(executionContext: ExecutionContext): void {
		const isAlive = ExecutionManager.it().getThread().isAlive()
		executionContext.operandStack.push(new int(isAlive ? 1 : 0))
	}

	private nativeStart0(): void {
		ExecutionManager.it().getThread().start()
	}

	public toString(): string {
		return 'native java/lang/Thread'
	}
}
