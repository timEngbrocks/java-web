import { appendFileSync } from 'fs'
import { BootstrapClassLoader } from './class/BootstrapClassLoader'
import { ClassInstance } from './class/ClassInstance'
import { ClassObject } from './class/ClassObject'
import { ClassManager } from './manager/ClassManager'
import { DebugManager } from './manager/DebugManager'
import { ExecutionManager } from './manager/ExecutionManager'

export class Interpreter {
	public static globalPC = 0
	private static instructionLog = [] as string[]

	public static dumpInstructionLog(): void {
		if (Interpreter.instructionLog.length === 0) return
		DebugManager.it().printStacktrace()
		const log = Interpreter.instructionLog.reduce((acc, val) => {
			acc += `\n${val}`
			return acc
		}, '')
		appendFileSync('./.log', log)
		Interpreter.instructionLog = []
	}

	public loadVMClasses(classes: string[]): void {
		this.loadClasses(classes)
		ClassManager.it().initializeAll()
	}

	public loadClasses(classes: string[]): void {
		const classObjects: ClassObject[] = []
		console.log('Loading classes and interfaces')
		for (let i = 0; i < classes.length; i++) {
			const classObject = new BootstrapClassLoader().loadClassOrInterface(classes[i])
			if (classObject instanceof ClassObject) classObjects.push(classObject)
		}
		console.log(`Loaded ${ClassManager.it().getNumberOfClassesAndInterfaces()} classes and interfaces`)
	}

	public run(): void {
		const classObject = ClassManager.it().getClassWithMainMethod()
		if (!classObject) throw new Error('Could not find class with main method')
		console.log('Executing main')
		classObject.initializeIfUninitialized()
		ExecutionManager.it().setupFunctionCall(classObject, 'main', '([Ljava/lang/String;)V')
		ExecutionManager.it().executeFunctionCall(classObject)
		this.execute()
	}

	public execute(): void {
		while (ExecutionManager.it().currentMethodHasNext()) {
			try {
				const instruction = ExecutionManager.it().currentMethodNext()
				const instanceTag = ExecutionManager.it().current() instanceof ClassInstance ? 'I' : 'O'
				const logHeader = `{${Interpreter.globalPC}}[{${instanceTag}} ${ExecutionManager.it().currentName()}(${ExecutionManager.it().currentId()}) - ${ExecutionManager.it().currentMethod().instructionStream.getName()} @ ${ExecutionManager.it().currentPC()}]:`
				const tab = ('\t').repeat(Math.max(Math.ceil((144 - logHeader.length) / 8), 0))
				// console.log(`${logHeader}${tab}${instruction.toString()}`)
				Interpreter.instructionLog.push(`${logHeader}${tab}${instruction.toString()}`)
				instruction.execute()
			} catch (error) {
				Interpreter.dumpInstructionLog()
				throw error
			}
			Interpreter.globalPC++
		}
	}
}
