import type { ClassInstance } from '../../../interpreter/class/ClassInstance'
import { ArrayType } from '../../../interpreter/data-types/ArrayType'
import { int } from '../../../interpreter/data-types/int'
import { ReferenceType } from '../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { DebugManager } from '../../../interpreter/manager/DebugManager'
import { ExecutionManager } from '../../../interpreter/manager/ExecutionManager'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { constructStringClass } from '../../../interpreter/util/util'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeThrowable extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'fillInStackTrace': {
				this.nativeFillInStackTrace(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeFillInStackTrace(executionContext: ExecutionContext): void {
		const throwableRef = executionContext.localVariables.get(0) as ReferenceType
		const throwableObject = RuntimeManager.it().load(throwableRef) as ClassInstance
		const stacktrace = DebugManager.it().getInternalStacktrace()
		const stacktraceElementArray = new ArrayType(new ReferenceType(), stacktrace.length)
		stacktrace.forEach(traceElement => {
			const traceElementObject = ClassManager.it().newInstance('java/lang/StackTraceElement')
			const traceElementRef = RuntimeManager.it().allocate(traceElementObject)
			ExecutionManager.it().setupExecuteOutOfOrder()
			ExecutionManager.it().setupFunctionCall(traceElementObject, '<init>', '(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V')
			traceElementObject.setLocal(traceElementRef, 0)
			traceElementObject.setLocal(constructStringClass(traceElement.class), 1)
			traceElementObject.setLocal(constructStringClass(traceElement.method), 2)
			traceElementObject.setLocal(constructStringClass(''), 3)
			traceElementObject.setLocal(new int(traceElement.pc), 4)
			ExecutionManager.it().executeFunctionCall(traceElementObject)
			ExecutionManager.it().callExecuteOutOfOrder()
			stacktraceElementArray.get().push(traceElementRef)
		})
		const stacktraceElementArrayRef = RuntimeManager.it().allocate(stacktraceElementArray)
		throwableObject.putField('stackTrace', stacktraceElementArrayRef)
		throwableObject.putField('depth', new int(stacktrace.length))
		executionContext.operandStack.push(throwableRef)
	}

	public toString(): string {
		return 'native java/lang/Throwable'
	}
}
