import { existsSync, rmSync, writeFileSync } from 'fs'
import { ClassManager } from './interpreter/manager/ClassManager'
import { Interpreter } from './interpreter/Interpreter'
import { VMUniverse, VMUniverseStatus } from './jvm/VMUniverse'
import { RuntimeManager } from './interpreter/manager/RuntimeManager'
import { ThreadManager } from './interpreter/manager/ThreadManager'
import { ExecutionManager } from './interpreter/manager/ExecutionManager'
import { DebugManager } from './interpreter/manager/DebugManager'
import { FileManager } from './interpreter/manager/FileManager'

export class JVM {
	private readonly interpreter = new Interpreter()
	private readonly universe = new VMUniverse()

	public static suppressLogging(): void {
		console.log = () => {}
	}

	public static construct(): JVM {
		if (existsSync('./.log')) rmSync('./.log')
		writeFileSync('./.log', '')

		const jvm = new JVM()

		jvm.initializeGlobals()

		// FIXME: ObjectMonitor::Initialize
		// FIXME: ObjectSynchronizer::initialize

		jvm.initializeModules()

		// FIXME: Create the VMThread
		ThreadManager.it().createRootThreadGroup()
		ThreadManager.it().createPrimordialThread()
		ExecutionManager.it().setThread(ThreadManager.it().getPrimoridalThread())

		if (jvm.universe.getStatus() !== VMUniverseStatus.INITIALIZED) {
			throw new Error('VMUniverse should be fully initialized by now!')
		}

		jvm.initializeJavaLangClasses()

		// FIXME: MutexLocker::post_initialize
		// FIXME: ServiceThread::initialize
		// FIXME: MonitorDeflationThread::initialize

		jvm.initializeJSR292Classes()

		const systemClass = ClassManager.it().getClass('java/lang/System')
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(systemClass, 'initPhase2', '(ZZ)I')
		ExecutionManager.it().executeFunctionCall(systemClass)
		ExecutionManager.it().callExecuteOutOfOrder()

		console.log('Finished initPhase2')

		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(systemClass, 'initPhase3', '()V')
		ExecutionManager.it().executeFunctionCall(systemClass)
		ExecutionManager.it().callExecuteOutOfOrder()

		console.log('Finished initPhase3')

		// FIXME: SystemDictionary::compute_java_loaders

		jvm.callPostVMInitHook()

		// FIXME: Make WatcherThread startable --> start WatcherThread

		return jvm
	}

	public runClasses(classes: string[]): void {
		this.interpreter.loadClasses(classes)
		this.interpreter.run()
	}

	private initializeGlobals(): void {
		// FIXME: mutex init
	}

	private initializeModules(): void {
		DebugManager.construct()
		ExecutionManager.construct(this.interpreter.execute)
		ClassManager.construct()
		FileManager.construct()
		ThreadManager.construct()
		// FIXME: initialize finalizer
		// FIXME: initialize code cache
		RuntimeManager.construct()
		// FIXME: initialize GC barrier
		this.universe.genesis()
	}

	private initializeJavaLangClasses(): void {
		this.initializeClass('java/lang/String')
		this.initializeClass('java/lang/System')
		this.initializeClass('java/lang/Class')
		this.initializeClass('java/lang/ThreadGroup')
		// FIXME: create initial thread group -> VMUniverse
		ThreadManager.it().createRootThreadGroup()
		this.initializeClass('java/lang/Thread')
		// FIXME: create initial thread
		ThreadManager.it().createPrimordialThread()
		this.initializeClass('java/lang/Module')
		this.initializeClass('jdk/internal/misc/UnsafeConstants')
		// FIXME: set unsafe constants
		this.initializeClass('java/lang/reflect/Method')
		this.initializeClass('java/lang/ref/Finalizer')

		const systemClass = ClassManager.it().getClass('java/lang/System')
		ExecutionManager.it().setupExecuteOutOfOrder()
		ExecutionManager.it().setupFunctionCall(systemClass, 'initPhase1', '()V')
		ExecutionManager.it().executeFunctionCall(systemClass)
		ExecutionManager.it().callExecuteOutOfOrder()

		console.log('Finished initPhase1')

		this.initializeClass('java/lang/OutOfMemoryError')
		this.initializeClass('java/lang/NullPointerException')
		this.initializeClass('java/lang/ClassCastException')
		this.initializeClass('java/lang/ArrayStoreException')
		this.initializeClass('java/lang/ArithmeticException')
		this.initializeClass('java/lang/StackOverflowError')
		this.initializeClass('java/lang/IllegalMonitorStateException')
		this.initializeClass('java/lang/IllegalArgumentException')
	}

	private initializeJSR292Classes(): void {
		this.initializeClass('java/lang/invoke/MethodHandle')
		this.initializeClass('java/lang/invoke/ResolvedMethodName')
		this.initializeClass('java/lang/invoke/MemberName')
		this.initializeClass('java/lang/invoke/MethodHandleNatives')
	}

	private callPostVMInitHook(): void {
		this.initializeClass('jdk/internal/vm/PostVMInitHook')
		// FIXME: call static: run -> ()V
	}

	private initializeClass(name: string): void {
		const clazz = ClassManager.it().getClass(name)
		clazz.initializeIfUninitialized()
	}
}
