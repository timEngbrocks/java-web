import type { ClassInstance } from '../../../interpreter/class/ClassInstance'
import { int } from '../../../interpreter/data-types/int'
import { long } from '../../../interpreter/data-types/long'
import type { ReferenceType } from '../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import { ThreadManager } from '../../../interpreter/manager/ThreadManager'
import { ThreadScheduler } from '../../../interpreter/manager/ThreadScheduler'
import { DirectHeapAddress } from '../../../interpreter/memory/heap'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { getTextFromString } from '../../../interpreter/util/util'
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
				this.nativeStart0(executionContext)
				break
			}
			case 'currentCarrierThread': {
				this.nativeCurrentCarrierThread(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeCurrentThread(executionContext: ExecutionContext): void {
		const thread = ThreadManager.it().current()
		executionContext.operandStack.push(thread.getThreadReference())
	}

	private nativeGetNextThreadIdOffset(executionContext: ExecutionContext): void {
		const instance = ClassManager.it().newInstance('java/lang/Thread$ThreadIdentifiers')
		instance.putStaticField('NEXT_TID_OFFSET', new long(BigInt(ThreadManager.it().getNextThreadId())))
		const reference = RuntimeManager.it().allocate(instance)
		const fields = instance.getAllFieldsInOrder()
		const offset = fields.findIndex(([key, _value]) => key === 'NEXT_TID_OFFSET')
		executionContext.operandStack.push(new DirectHeapAddress(reference, offset).getEncodedValue())
	}

	private nativeSetPriority0(executionContext: ExecutionContext): void {
		const callerRef = executionContext.localVariables.get(0) as ReferenceType
		const caller = RuntimeManager.it().load(callerRef) as ClassInstance
		const threadId = (caller.getField('tid') as long).get() as number
		const newPriority = executionContext.localVariables.get(1) as int
		ThreadScheduler.it().setThreadPriority(threadId, newPriority.get() as number)
	}

	private nativeIsAlive0(executionContext: ExecutionContext): void {
		const callerRef = executionContext.localVariables.get(0) as ReferenceType
		const caller = RuntimeManager.it().load(callerRef) as ClassInstance
		const threadId = (caller.getField('tid') as long).get() as number
		const thread = ThreadManager.it().getThread(threadId)
		if (!thread) executionContext.operandStack.push(new int(0))
		else {
			const isAlive = thread.isAlive()
			executionContext.operandStack.push(new int(isAlive ? 1 : 0))
		}
	}

	private nativeStart0(executionContext: ExecutionContext): void {
		const callerRef = executionContext.localVariables.get(0) as ReferenceType
		const caller = RuntimeManager.it().load(callerRef) as ClassInstance
		const threadId = (caller.getField('tid') as long).get() as number
		const nameRef = caller.getField('name') as ReferenceType
		const name = getTextFromString(nameRef).split(',').join('')
		const holderRef = caller.getField('holder') as ReferenceType
		const holder = RuntimeManager.it().load(holderRef) as ClassInstance
		const threadGroupRef = holder.getField('group') as ReferenceType
		const threadGroup = RuntimeManager.it().load(threadGroupRef) as ClassInstance
		const groupNameRef = threadGroup.getField('name') as ReferenceType
		const groupName = getTextFromString(groupNameRef).split(',').join('')
		ThreadManager.it().createThread(threadId, name, groupName)
		ThreadScheduler.it().addNewThread(threadId)
		ThreadScheduler.it().start(threadId)
	}

	// FIXME:
	private nativeCurrentCarrierThread(executionContext: ExecutionContext): void {
		const thread = ThreadManager.it().current()
		executionContext.operandStack.push(thread.getThreadReference())
	}

	public toString(): string {
		return 'native java/lang/Thread'
	}
}
