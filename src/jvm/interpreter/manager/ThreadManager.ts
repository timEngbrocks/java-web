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
import { ThreadScheduler } from './ThreadScheduler'

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
		'system',
		new ReferenceType(),
		new ReferenceType()
	)

	private systemThreadGroup: InternalThreadGroup = new InternalThreadGroup('system', new ReferenceType())

	private readonly threads = new Map<number, InternalThread>()
	private readonly threadGroups = new Map<string, InternalThreadGroup>()

	private nextThreadId = 2

	private constructor() {
		this.threads.set(1, this.primoridalThread)
		this.threadGroups.set('system', this.systemThreadGroup)
	}

	public current(): InternalThread {
		return this.getThread(ThreadScheduler.it().current())!
	}

	public createThread(id: number, name: string, groupName: string | undefined): InternalThread {
		const threadObject = ClassManager.it().newInstance('java/lang/Thread')
		threadObject.initializeIfUninitialized()
		const threadRef = RuntimeManager.it().allocate(threadObject)
		let threadGroupRef = new ReferenceType()
		if (groupName) {
			const threadGroup = this.threadGroups.get(groupName)
			if (threadGroup) threadGroupRef = threadGroup.getThreadGroupReference()
		}
		const internalThread = new InternalThread(
			id,
			name,
			groupName,
			threadRef,
			threadGroupRef
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
		threadObject.setLocal(threadGroupRef, 1)
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
		if (name === 'system') this.systemThreadGroup = internalThreadGroup
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(threadGroupObject, '<init>', '()V')
		threadGroupObject.setLocal(threadGroupObjectRef, 0)
		ExecutionManager.it().executeFunctionCall(threadGroupObject)
		ExecutionManager.it().callExecuteOutOfOrder()
		return internalThreadGroup
	}

	public createSystemThreadGroup(): void {
		this.createThreadGroup('system')
	}

	public createPrimordialThread(): void {
		this.createThread(1, 'primoridal', 'system')
	}

	public getPrimoridalThread(): InternalThread {
		return this.primoridalThread
	}

	public getSystemThreadGroup(): InternalThreadGroup {
		return this.systemThreadGroup
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
}
