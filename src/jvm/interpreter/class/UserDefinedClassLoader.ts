import { ClassLoader } from './ClassLoader'
import type { ClassObject } from './ClassObject'

export class UserDefinedClassLoader extends ClassLoader {
	public loadClassOrInterface(_name: string): ClassObject {
		throw new Error('TODO')
	}
}
