import type { ClassInstance } from '../../../interpreter/class/ClassInstance'
import type { ReferenceType } from '../../../interpreter/data-types/ReferenceType'
import { int } from '../../../interpreter/data-types/int'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { cloneDeep } from 'lodash'
import { ThreadScheduler } from '../../../interpreter/manager/ThreadScheduler'

export class NativeObject extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'getClass': {
				this.nativeGetClass(executionContext)
				break
			}
			case 'hashCode': {
				this.nativeHashCode(executionContext)
				break
			}
			case 'notifyAll': {
				this.nativeNotifyAll()
				break
			}
			case 'clone': {
				this.nativeClone(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeGetClass(executionContext: ExecutionContext): void {
		const callerClassReference = executionContext.localVariables.get(0) as ReferenceType
		const callerClass = RuntimeManager.it().load(callerClassReference) as ClassInstance
		const classReference = ClassManager.it().getAssociatedClassObject(callerClass.getName())
		executionContext.operandStack.push(classReference)
	}

	private nativeHashCode(executionContext: ExecutionContext): void {
		const callerClassReference = executionContext.localVariables.get(0) as ReferenceType
		const address = callerClassReference.get().address!.get().toString()
		let hashedAddress = 0
		for (let i = 0; i < address.length; i++) {
			const chr = address.charCodeAt(i)
			hashedAddress = ((hashedAddress << 5) - hashedAddress) + chr
			hashedAddress |= 0
		}
		executionContext.operandStack.push(new int(hashedAddress))
	}

	private nativeClone(executionContext: ExecutionContext): void {
		const callerRef = executionContext.localVariables.get(0) as ReferenceType
		const caller = RuntimeManager.it().load(callerRef) as ClassInstance
		const clone = cloneDeep(caller)
		executionContext.operandStack.push(RuntimeManager.it().allocate(clone))
	}

	private nativeNotifyAll(): void {
		ThreadScheduler.it().notifyAll()
	}

	public toString(): string {
		return 'native java/lang/Object'
	}
}
