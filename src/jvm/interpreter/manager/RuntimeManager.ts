import { isString } from 'lodash'
import type { CPInfo } from '../../parser/types/CPInfo'
import type { DataType } from '../data-types/data-type'
import { ReferenceType } from '../data-types/ReferenceType'
import { Heap } from '../memory/heap'
import { HeapAddress } from '../memory/HeapAddress'
import type { HeapData } from '../memory/HeapData'
import { HEAP_TYPES } from '../memory/HeapTypes'
import type { LocalVariables } from '../memory/LocalVariables'
import { ClassManager } from './ClassManager'
import { ExecutionManager } from './ExecutionManager'
import { ThreadManager } from './ThreadManager'

export class RuntimeManager {
	private static instance: RuntimeManager | undefined = undefined

	public static construct(): void {
		RuntimeManager.instance = new RuntimeManager()
	}

	public static it(): RuntimeManager {
		return RuntimeManager.instance!
	}

	private readonly heap: Heap = new Heap()

	public constant(index: number): CPInfo<any> {
		const currentMethod = ExecutionManager.it().current().currentMethod()
		const currentMethodClassName = currentMethod.methodObject.className
		if (ClassManager.it().isClass(currentMethodClassName)) {
			const currentMethodClass = ClassManager.it().getClass(currentMethodClassName)
			return currentMethodClass.constant(index)
		} else {
			const currentMethodInterface = ClassManager.it().getInterface(currentMethodClassName)
			return currentMethodInterface.constant(index)
		}
	}

	public push(value: DataType<any>): void {
		ExecutionManager.it().current().push(value)
	}

	public pop(): DataType<any> {
		return ExecutionManager.it().current().pop()
	}

	public setLocal(value: DataType<any>, index: number): void {
		ExecutionManager.it().current().setLocal(value, index)
	}

	public getLocal(index: number): DataType<any> {
		return ExecutionManager.it().current().getLocal(index)
	}

	public allCurrentLocals(): LocalVariables {
		return ThreadManager.it().current().currentExecution().allCurrentLocals()
	}

	public allocate(value: HeapData): ReferenceType {
		return this.heap.allocate(value)
	}

	public load(reference: ReferenceType): HeapData {
		if (reference.get().address?.getType() === HEAP_TYPES.UNRESOLVED_CLASS_OR_INTERFACE) {
			const value = this.heap.load(reference)
			if (isString(value)) {
				const index = reference.get().address?.get()
				if (!index) throw new Error(`Tried resolving unresolved class or interface but got null dereference: ${reference}`)
				if (ClassManager.it().isClass(value)) {
					const instance = ClassManager.it().newInstance(value)
					this.heap.markUnresolvedClassAsResolved(index, instance)
					reference = new ReferenceType({ address: new HeapAddress(index, HEAP_TYPES.CLASS), name: instance.getName() })
					return instance
				} else if (ClassManager.it().isInterface(value)) {
					const interfaceObject = ClassManager.it().getInterface(value)
					this.heap.markUnresolvedInterfaceAsResolved(index, interfaceObject)
					reference = new ReferenceType({ address: new HeapAddress(index, HEAP_TYPES.CLASS), name: interfaceObject.getName() })
					return interfaceObject
				}
			}
		}
		return this.heap.load(reference)
	}

	public getStatic(className: string, fieldName: string): DataType<any> {
		return ClassManager.it().getClass(className).getStaticField(fieldName)
	}

	public putStatic(className: string, fieldName: string, value: DataType<any>): void {
		ClassManager.it().getClass(className).putStaticField(fieldName, value)
	}
}
