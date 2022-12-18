import { existsSync } from 'fs'
import { ClassFile } from '../../parser/types/ClassFile'
import { ConstantUtf8 } from '../../parser/types/constants/ConstantUtf8'
import { CPInfo } from '../../parser/types/CPInfo'
import { BootstrapClassLoader } from './BootstrapClassLoader'
import { ClassObject } from './ClassObject'
import { ClassObjectManager } from './ClassObjectManager'

export abstract class ClassLoader {
	private readonly unresolvedClassesOrdered: string[] = []
	private readonly unresolvedClasses = new Set<string>()

	public abstract load(name: string): ClassObject

	public static canBeLoaded(name: string): boolean {
		return existsSync('jdk/' + name + '.class')
	}

	constructor() {
		this.addUnresolvedClass('java/lang/Object.class')
		this.addUnresolvedClass('java/lang/Class.class')
		this.addUnresolvedClass('java/lang/System.class')
	}

	protected addUnresolvedClass(name: string): void {
		if (!this.unresolvedClasses.has(name) && !ClassObjectManager.doesClassExist(name.replace('.class', ''))) {
			this.unresolvedClasses.add(name)
			this.unresolvedClassesOrdered.push(name)
		}
	}

	protected resolveUnresolvedClasses(): void {
		for (const name of this.unresolvedClassesOrdered) {
			const loader = new BootstrapClassLoader()
			loader.load(name)
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
