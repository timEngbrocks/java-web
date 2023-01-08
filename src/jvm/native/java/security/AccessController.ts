import type { ClassInstance } from '../../../interpreter/class/ClassInstance'
import { ArrayType } from '../../../interpreter/data-types/ArrayType'
import { ReferenceType } from '../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { ExecutionManager } from '../../../interpreter/manager/ExecutionManager'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import { ThreadManager } from '../../../interpreter/manager/ThreadManager'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeAccessController extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'getStackAccessControlContext': {
				this.nativeGetStackAccessControlContext(executionContext)
				break
			}
			case 'getInheritedAccessControlContext': {
				this.nativeGetInheritedAccessControlContext(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeGetStackAccessControlContext(executionContext: ExecutionContext): void {
		const protectionDomainArray = new ArrayType(new ReferenceType(), 0)
		const protectionDomainArrayRef = RuntimeManager.it().allocate(protectionDomainArray)

		const accessControlContextObject = ClassManager.it().newInstance('java/security/AccessControlContext')
		const accessControlContextObjectRef = RuntimeManager.it().allocate(accessControlContextObject)
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(accessControlContextObject, '<init>', '([Ljava/security/ProtectionDomain;)V')
		accessControlContextObject.setLocal(accessControlContextObjectRef, 0)
		accessControlContextObject.setLocal(protectionDomainArrayRef, 1)
		ExecutionManager.it().executeFunctionCall(accessControlContextObject)
		ExecutionManager.it().callExecuteOutOfOrder()

		executionContext.operandStack.push(accessControlContextObjectRef)
	}

	private nativeGetInheritedAccessControlContext(executionContext: ExecutionContext): void {
		const threadRef = ThreadManager.it().getPrimoridalThread().getThreadReference()
		const threadObject = RuntimeManager.it().load(threadRef) as ClassInstance
		const inheritedAccessControlContextRef = threadObject.getField('inheritedAccessControlContext') as ReferenceType
		executionContext.operandStack.push(inheritedAccessControlContextRef)
	}

	public toString(): string {
		return 'native java/security/AccessController'
	}
}
