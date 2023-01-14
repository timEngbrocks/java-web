import { map } from 'lodash'
import type { ClassInstance } from '../class/ClassInstance'
import type { ExecutableInterface } from '../class/ExecutableInterface'
import type { ArrayType } from '../data-types/ArrayType'
import type { byte } from '../data-types/byte'
import type { ReferenceType } from '../data-types/ReferenceType'
import { Interpreter } from '../Interpreter'
import type { ExecutionContext } from '../util/ExecutionContext'
import type { Stack } from '../util/Stack'
import { ExecutionManager } from './ExecutionManager'
import { RuntimeManager } from './RuntimeManager'

export class DebugManager {
	private static instance: DebugManager | undefined = undefined

	public static construct(): void {
		DebugManager.instance = new DebugManager()
	}

	public static it(): DebugManager {
		return DebugManager.instance!
	}

	private lastClassNameAndId = ''
	private lastExecutionContext: ExecutionContext | undefined = undefined

	public getLastClassNameAndId(): string {
		return this.lastClassNameAndId
	}

	public setLastClassNameAndId(lastClassNameAndId: string): void {
		this.lastClassNameAndId = lastClassNameAndId
	}

	public getLastExecutionContext(): ExecutionContext | undefined {
		return this.lastExecutionContext
	}

	public setLastExecutionContext(lastExecutionContext: ExecutionContext): void {
		this.lastExecutionContext = lastExecutionContext
	}

	public debugValue(className: string, methodName: string, ...args: any[]): void {
		if (ExecutionManager.it().getExecutionStack().isEmpty()) return
		if (ExecutionManager.it().current().getName() === className && ExecutionManager.it().currentMethod().methodObject.name === methodName) console.log(Interpreter.globalPC, ...args)
	}

	public debugExpression(className: string, methodName: string, expression: (...args: any[]) => void, ...args: any[]): void {
		if (ExecutionManager.it().current().getName() === className && ExecutionManager.it().currentMethod().methodObject.name === methodName) {
			const originalLog = console.log
			console.log = (...args: any[]) => {
				originalLog(Interpreter.globalPC, ...args)
			}
			expression(...args)
			console.log = originalLog
		}
	}

	public debugString(className: string, methodName: string, stringReference: ReferenceType): void {
		const stringInstance = RuntimeManager.it().load(stringReference) as ClassInstance
		if (stringInstance.getName() !== 'java/lang/String') {
			this.debugValue(className, methodName, 'Not a string')
			return
		}
		const valueArrayRef = stringInstance.getField('value') as ReferenceType
		const valueArray = RuntimeManager.it().load(valueArrayRef) as ArrayType
		const bytes = []
		for (const reference of valueArray.get()) bytes.push(RuntimeManager.it().load(reference) as byte)
		this.debugValue(className, methodName, map(bytes, x => String.fromCharCode(x.get() as number)).join())
	}

	public printStacktrace(): void {
		console.log(this.getStacktrace().join(''))
	}

	public getStacktrace(): string[] {
		const stacktrace: string[] = [
			'\n-------- STACK TRACE --------',
			`\n-------- ${Interpreter.globalPC} --------`
		]
		let index = 0
		const internalStacktrace = this.getInternalStacktrace()
		internalStacktrace.forEach(traceElement => {
			stacktrace.push(`\n[${index++}] ${traceElement.class}: ${traceElement.method} - ${traceElement.pc}`)
		})
		stacktrace.push('\n-------- END OF STACK TRACE --------\n')
		return [...new Set(stacktrace)]
	}

	public getInternalStacktrace(): { class: string, method: string, pc: number }[] {
		let stacktrace: { class: string, method: string, pc: number }[] = []
		ExecutionManager.it().getExecutionStackHistory().all().forEach(stack => {
			stacktrace = stacktrace.concat(this.getInternalStacktraceFromExecutionStack(stack))
		})
		stacktrace = stacktrace.concat(this.getInternalStacktraceFromExecutionStack(ExecutionManager.it().getExecutionStack()))
		if (ExecutionManager.it().hasCurrent()) {
			stacktrace.push({
				class: ExecutionManager.it().currentMethod().methodObject.className,
				method: ExecutionManager.it().currentMethod().methodObject.name,
				pc: ExecutionManager.it().currentMethod().instructionStream.getPC()
			})
		}
		return stacktrace
	}

	private getInternalStacktraceFromExecutionStack(stack: Stack<ExecutableInterface>): { class: string, method: string, pc: number }[] {
		let stacktrace: { class: string, method: string, pc: number }[] = []
		stack.all().forEach(executableInterface => {
			stacktrace = stacktrace.concat(executableInterface.getInternalStacktrace())
		})
		return stacktrace
	}
}
