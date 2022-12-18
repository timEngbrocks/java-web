import { Interpreter } from './interpreter/Interpreter'
import { Runtime } from './interpreter/Runtime'

export class JVM {
	private static runtime: Runtime

	private readonly interpreter: Interpreter

	public static suppressLogging(): void {
		console.log = () => {}
	}

	constructor(classes: string[]) {
		console.log('Starting JVM')
		this.interpreter = new Interpreter()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		JVM.runtime = new Runtime(this.interpreter.execute)
		this.interpreter.loadClasses(classes)
		this.interpreter.execute()
		console.log('Exiting JVM')
	}
}
