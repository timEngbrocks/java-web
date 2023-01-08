import type { ClassFile } from '../../parser/types/ClassFile'
import type { ConstantUtf8 } from '../../parser/types/constants/ConstantUtf8'
import type { CPInfo } from '../../parser/types/CPInfo'
import type { ClassObject } from './ClassObject'
import type { InterfaceObject } from './InterfaceObject'

export abstract class ClassLoader {
	private readonly unresolvedClassesOrdered: string[] = []
	private readonly unresolvedClasses = new Set<string>()

	public abstract loadClassOrInterface(name: string): ClassObject | InterfaceObject

	constructor() {
		this.addUnresolvedClass('java/lang/Object.class')
		this.addUnresolvedClass('java/lang/Class.class')
		this.addUnresolvedClass('java/lang/System.class')
	}

	protected addUnresolvedClass(name: string): void {
		if (!this.unresolvedClasses.has(name)) {
			this.unresolvedClasses.add(name)
			this.unresolvedClassesOrdered.push(name)
		}
	}

	protected resolveUnresolvedClasses(loaderType: new () => ClassLoader): void {
		for (const name of this.unresolvedClassesOrdered) {
			const loader = new loaderType()
			loader.loadClassOrInterface(name)
		}
	}

	protected resolveName(classFile: ClassFile, nameIndex: number): string {
		return (this.resolveConstant(classFile, nameIndex) as ConstantUtf8).data.bytes.toString().split(',').join('')
	}

	protected resolveConstant(classFile: ClassFile, index: number): CPInfo<any> {
		return classFile.data.header.constantPool[index - 1]
	}

	protected isJDKClass(name: string): boolean {
		return name.startsWith('java') ||
			name.startsWith('jdk') ||
			name.startsWith('javax') ||
			name.startsWith('sun') ||
			name.startsWith('com')
	}
}
