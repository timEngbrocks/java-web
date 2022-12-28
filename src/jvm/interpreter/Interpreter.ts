import { BootstrapClassLoader } from './class/BootstrapClassLoader'
import { ClassInstance } from './class/ClassInstance'
import { ClassObject } from './class/ClassObject'
import { ClassObjectManager } from './class/ClassObjectManager'
import { Runtime } from './Runtime'

export class Interpreter {
	public static globalPC = 0
	private static instructionLog = [] as string[]

	public static dumpInstructionLog(length: number): void {
		for (let i = Math.max(Interpreter.instructionLog.length - length - 1, 0); i < Interpreter.instructionLog.length; i++) {
			console.log(Interpreter.instructionLog[i])
		}
		Interpreter.instructionLog = []
	}

	public loadClasses(classes: string[]): void {
		const classObjects: ClassObject[] = []
		console.log('Loading classes and interfaces')
		for (let i = 0; i < classes.length; i++) {
			const classObject = new BootstrapClassLoader().loadClassOrInterface(classes[i])
			if (classObject instanceof ClassObject) classObjects.push(classObject)
		}
		console.log(`Loaded ${ClassObjectManager.getNumberOfClassesAndInterfaces()} classes and interfaces`)
		const classObject = ClassObjectManager.getClassWithMainMethod()

		// FIXME: Thread initialization

		const systemClass = ClassObjectManager.getClass('java/lang/System')
		Runtime.it().setupExecuteOutOfOrder()
		Runtime.it().setupFunctionCall(systemClass, 'initPhase1', '()V')
		Runtime.it().executeFunctionCall(systemClass)
		Runtime.it().callExecuteOutOfOrder()
		Runtime.it().setupExecuteOutOfOrder()
		Runtime.it().setupFunctionCall(systemClass, 'initPhase2', '(ZZ)I')
		Runtime.it().executeFunctionCall(systemClass)
		Runtime.it().callExecuteOutOfOrder()
		Runtime.it().setupExecuteOutOfOrder()
		Runtime.it().setupFunctionCall(systemClass, 'initPhase3', '()V')
		Runtime.it().executeFunctionCall(systemClass)
		Runtime.it().callExecuteOutOfOrder()

		if (!classObject) throw new Error('Could not find class with main method')
		console.log('Executing main')
		classObject.initializeIfUninitialized()
		Runtime.it().setupFunctionCall(classObject, 'main', '([Ljava/lang/String;)V')
		Runtime.it().executeFunctionCall(classObject)
	}

	public execute(): void {
		while (Runtime.it().currentMethodHasNext()) {
			try {
				const instruction = Runtime.it().currentMethodNext()
				const instanceTag = Runtime.it().current() instanceof ClassInstance ? 'I' : 'O'
				const logHeader = `{${Interpreter.globalPC}}[{${instanceTag}} ${Runtime.it().currentName()}(${Runtime.it().currentId()}) - ${Runtime.it().currentMethod().instructionStream.getName()} @ ${Runtime.it().currentPC()}]:`
				const tab = ('\t').repeat(Math.max(Math.ceil((144 - logHeader.length) / 8), 0))
				Interpreter.instructionLog.push(`${logHeader}${tab}${instruction.toString()}`)
				instruction.execute()
				if (Interpreter.globalPC > 93000) throw new Error('Panic')
			} catch (error) {
				Interpreter.dumpInstructionLog(10)
				throw error
			}
			Interpreter.globalPC++
		}
	}
}
