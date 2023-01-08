import { ArrayType } from '../data-types/ArrayType'
import { byte } from '../data-types/byte'
import { int } from '../data-types/int'
import { long } from '../data-types/long'
import { ReferenceType } from '../data-types/ReferenceType'
import { InternalThread } from '../thread/InternalThread'
import { InternalThreadGroup } from '../thread/InternalThreadGroup'
import { ClassManager } from './ClassManager'
import { ExecutionManager } from './ExecutionManager'
import { RuntimeManager } from './RuntimeManager'

export class ThreadManager {
	private static instance: ThreadManager | undefined = undefined

	public static construct(): void {
		ThreadManager.instance = new ThreadManager()
	}

	public static it(): ThreadManager {
		return ThreadManager.instance!
	}

	private primoridalThread: InternalThread = new InternalThread(
		1,
		'primoridal',
		'root',
		new ReferenceType(),
		new ReferenceType()
	)

	private rootThreadGroup: InternalThreadGroup = new InternalThreadGroup('root', new ReferenceType())

	private readonly threads = new Map<number, InternalThread>()
	private readonly threadGroups = new Map<string, InternalThreadGroup>()

	private nextThreadId = 2

	constructor() {
		this.threads.set(1, this.primoridalThread)
		this.threadGroups.set('root', this.rootThreadGroup)
	}

	public createThread(id: number, name: string, groupName: string): InternalThread {
		const threadObject = ClassManager.it().newInstance('java/lang/Thread')
		threadObject.initializeIfUninitialized()
		const threadRef = RuntimeManager.it().allocate(threadObject)
		const threadGroup = this.threadGroups.get(groupName)
		const internalThread = new InternalThread(
			id,
			name,
			groupName,
			threadRef,
			threadGroup!.getThreadGroupReference()
		)
		this.threads.set(id, internalThread)
		if (id === 1) this.primoridalThread = internalThread
		const stringClass = ClassManager.it().newInstance('java/lang/String')
		stringClass.initializeIfUninitialized()
		const stringValue = new ArrayType(new byte())
		for (let i = 0; i < name.length; i++) {
			stringValue.get().push(RuntimeManager.it().allocate(new byte(name.charCodeAt(i))))
		}
		stringClass.putField('value', RuntimeManager.it().allocate(stringValue))
		const nameRef = RuntimeManager.it().allocate(stringClass)
		threadObject.initializeIfUninitialized()
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(threadObject, '<init>', '(Ljava/lang/ThreadGroup;Ljava/lang/String;ILjava/lang/Runnable;JLjava/security/AccessControlContext;)V')
		threadObject.setLocal(threadRef, 0)
		threadObject.setLocal(threadGroup!.getThreadGroupReference(), 1)
		threadObject.setLocal(nameRef, 2)
		threadObject.setLocal(new int(0), 3)
		threadObject.setLocal(new ReferenceType(), 4)
		threadObject.setLocal(new long(0n), 5)
		threadObject.setLocal(new ReferenceType(), 7)
		ExecutionManager.it().executeFunctionCall(threadObject)
		ExecutionManager.it().callExecuteOutOfOrder()
		return internalThread
	}

	public createThreadGroup(name: string): InternalThreadGroup {
		const threadGroupObject = ClassManager.it().newInstance('java/lang/ThreadGroup')
		threadGroupObject.initializeIfUninitialized()
		const threadGroupObjectRef = RuntimeManager.it().allocate(threadGroupObject)
		const internalThreadGroup = new InternalThreadGroup(name, threadGroupObjectRef)
		this.threadGroups.set(name, internalThreadGroup)
		if (name === 'root') this.rootThreadGroup = internalThreadGroup
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(threadGroupObject, '<init>', '()V')
		threadGroupObject.setLocal(threadGroupObjectRef, 0)
		ExecutionManager.it().executeFunctionCall(threadGroupObject)
		ExecutionManager.it().callExecuteOutOfOrder()
		return internalThreadGroup
	}

	public createRootThreadGroup(): void {
		this.createThreadGroup('root')
	}

	public createPrimordialThread(): void {
		this.createThread(1, 'primoridal', 'root')
	}

	public getPrimoridalThread(): InternalThread {
		return this.primoridalThread
	}

	public getRootThreadGroup(): InternalThreadGroup {
		return this.rootThreadGroup
	}

	public getNextThreadId(): number {
		return this.nextThreadId++
	}

	public getThread(id: number): InternalThread | undefined {
		return this.threads.get(id)
	}

	public getThreadGroup(name: string): InternalThreadGroup | undefined {
		return this.threadGroups.get(name)
	}

	public notifyAll(): void {}
}
