import { BootstrapClassLoader } from './class/BootstrapClassLoader'
import { ClassInstance } from './class/ClassInstance'
import { ClassObject } from './class/ClassObject'
import { ClassObjectManager } from './class/ClassObjectManager'
import { Runtime } from './Runtime'

export class Interpreter {
	private static globalPC = 0

	public loadClasses(classes: string[]): void {
		const classObjects: ClassObject[] = []
		console.log('Loading classes')
		for (let i = 0; i < classes.length; i++) {
			const classObject = new BootstrapClassLoader().load(classes[i])
			classObjects.push(classObject)
		}
		console.log(`Loaded ${ClassObjectManager.getNumberOfClasses()} classes`)
		const classObject = ClassObjectManager.getClassWithMainMethod()

		// FIXME: Thread initialization

		const systemClass = ClassObjectManager.getClass('java/lang/System')
		Runtime.it().setupExecuteOutOfOrder()
		Runtime.it().setupFunctionCall(systemClass, 'initPhase1', '()V')
		Runtime.it().executeFunctionCall(systemClass)
		Runtime.it().callExecuteOutOfOrder()
		Runtime.it().setupExecuteOutOfOrder()
		Runtime.it().setupFunctionCall(systemClass, 'initPhase2', '()V')
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
			const instruction = Runtime.it().currentMethodNext()
			const instanceTag = Runtime.it().current() instanceof ClassInstance ? 'I' : 'O'
			const logHeader = `{${Interpreter.globalPC}}[{${instanceTag}} ${Runtime.it().currentName()}(${Runtime.it().currentId()}) - ${Runtime.it().currentMethod().instructionStream.getName()} @ ${Runtime.it().currentPC()}]:`
			const tab = ('\t').repeat(Math.max(Math.ceil((144 - logHeader.length) / 8), 0))
			console.log(`${logHeader}${tab}${instruction.toString()}`)
			instruction.execute()
			Interpreter.globalPC++
		}
	}
}
