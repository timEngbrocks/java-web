import { ClassObject } from '../../jvm/interpreter/ClassObject'
import { Interpreter } from '../../jvm/interpreter/Interpreter'
import { Runtime } from '../../jvm/interpreter/Runtime'

export const run = (classObject: ClassObject, classes: ClassObject[]): void => {
	const interpreter = new Interpreter()
	Runtime.set(classObject, classes)
	interpreter.execute()
}
