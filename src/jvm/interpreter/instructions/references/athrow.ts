import { map } from 'lodash'
import type { ClassInstance } from '../../class/ClassInstance'
import type { ArrayType } from '../../data-types/ArrayType'
import type { byte } from '../../data-types/byte'
import type { int } from '../../data-types/int'
import type { ReferenceType } from '../../data-types/ReferenceType'
import { RuntimeManager } from '../../manager/RuntimeManager'
import { Instruction } from '../Instruction'

export class athrow extends Instruction {
	override length = 1
	public override execute(): void {
		const throwableRef = RuntimeManager.it().pop() as ReferenceType
		const throwableObject = RuntimeManager.it().load(throwableRef) as ClassInstance
		const stacktrace = throwableObject.getField('stackTrace') as ReferenceType
		const stacktraceArray = RuntimeManager.it().load(stacktrace) as ArrayType
		for (const traceElementRef of stacktraceArray.get()) {
			const traceElement = RuntimeManager.it().load(traceElementRef) as ClassInstance
			const classNameRef = traceElement.getField('declaringClass') as ReferenceType
			const methodNameRef = traceElement.getField('methodName') as ReferenceType
			const lineNumber = traceElement.getField('lineNumber') as int
			const className = this.getTextFromString(classNameRef)
			const methodName = this.getTextFromString(methodNameRef)
			console.log(`\n[${className}]: ${methodName} (${lineNumber.get()})`)
		}
		throw new Error('TODO: athrow exception handling')
	}

	public override toString(): string {
		return 'athrow'
	}

	private getTextFromString(stringRef: ReferenceType): string {
		const stringInstance = RuntimeManager.it().load(stringRef) as ClassInstance
		const valueArrayRef = stringInstance.getField('value') as ReferenceType
		const valueArray = RuntimeManager.it().load(valueArrayRef) as ArrayType
		const bytes = []
		for (const reference of valueArray.get()) bytes.push(RuntimeManager.it().load(reference) as byte)
		return map(bytes, x => String.fromCharCode(x.get() as number)).join()
	}
}
