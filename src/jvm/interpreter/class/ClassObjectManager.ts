import { cloneDeep, isUndefined } from 'lodash'
import { ReferenceType } from '../data-types/data-type'
import { Runtime } from '../Runtime'
import { BootstrapClassLoader } from './BootstrapClassLoader'
import { ClassInstance } from './ClassInstance'
import { ClassLoader } from './ClassLoader'
import { ClassObject } from './ClassObject'

export enum ClassObjectState {
	UNINITIALIZED = 0,
	INITIALIZING = 1,
	INITIALIZED = 2
}

export class ClassObjectManager {
	private static readonly classes = new Map<string, ClassObject>()
	private static classHasBeenAdded = false
	private static readonly associatedClassObjects = new Map<string, ReferenceType>()
	private static readonly state = new Map<string, ClassObjectState>()

	public static addClass(classObject: ClassObject): void {
		ClassObjectManager.classes.set(classObject.getName(), classObject)
		ClassObjectManager.state.set(classObject.getName(), ClassObjectState.UNINITIALIZED)
		if (!ClassObjectManager.classHasBeenAdded && classObject.getName() === 'java/lang/Class') {
			ClassObjectManager.classHasBeenAdded = true
			classObject.initializeIfUninitialized()
			for (const [name, reference] of ClassObjectManager.associatedClassObjects) {
				if (!reference.get()) {
					ClassObjectManager.associatedClassObjects.set(name, ClassObjectManager.constructAssociatedClassObject(name))
				}
			}
		}
		if (!ClassObjectManager.classHasBeenAdded) {
			ClassObjectManager.associatedClassObjects.set(classObject.getName(), new ReferenceType(null, classObject.getName()))
		} else {
			ClassObjectManager.associatedClassObjects.set(classObject.getName(), ClassObjectManager.constructAssociatedClassObject(classObject.getName()))
		}
	}

	public static doesClassExist(name: string): boolean {
		return ClassObjectManager.classes.has(name)
	}

	public static getClass(name: string): ClassObject {
		if (!ClassObjectManager.doesClassExist(name) && ClassLoader.canBeLoaded(name)) {
			const bootstrapLoader = new BootstrapClassLoader()
			bootstrapLoader.load(name + '.class')
		}
		const classObject = ClassObjectManager.classes.get(name)
		if (!classObject) throw new Error(`Could not find class ${name}`)
		return classObject
	}

	public static getAssociatedClassObject(name: string): ReferenceType {
		ClassObjectManager.getClass(name)
		return ClassObjectManager.associatedClassObjects.get(name)!
	}

	public static newInstance(name: string): ClassInstance {
		const classObject = cloneDeep(ClassObjectManager.getClass(name))
		return new ClassInstance(classObject)
	}

	public static getClassState(name: string): ClassObjectState {
		const classState = ClassObjectManager.state.get(name)
		if (isUndefined(classState)) throw new Error(`Could not get state for ${name}`)
		return classState
	}

	public static updateClassState(classObject: ClassObject, newState: ClassObjectState): void {
		ClassObjectManager.classes.set(classObject.getName(), classObject)
		ClassObjectManager.state.set(classObject.getName(), newState)
	}

	public static getNumberOfClasses(): number {
		return ClassObjectManager.classes.size
	}

	public static getClassWithMainMethod(): ClassObject | undefined {
		for (const clazz of ClassObjectManager.classes.values()) {
			if (clazz.hasMain()) return clazz
		}
		return undefined
	}

	private static constructAssociatedClassObject(name: string): ReferenceType {
		const classInstance = ClassObjectManager.newInstance('java/lang/Class')
		// FIXME: Set module
		// classInstance.putField('module')
		classInstance.putField('classLoader', new ReferenceType(null))
		const actualClassAddress = Runtime.it().allocate(ClassObjectManager.newInstance(name))
		classInstance.putField('classData', new ReferenceType(actualClassAddress, name))
		const address = Runtime.it().allocate(classInstance)
		return new ReferenceType(address, name)
	}
}
