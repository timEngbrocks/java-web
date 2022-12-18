import { ClassLoader } from './ClassLoader'
import { ClassObject } from './ClassObject'

export class UserDefinedClassLoader extends ClassLoader {
	public load(name: string): ClassObject {
		throw new Error('TODO')
	}
}
