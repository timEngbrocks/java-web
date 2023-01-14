import { cloneDeep, isUndefined } from 'lodash'
import { ReferenceType } from '../data-types/ReferenceType'
import { createArrayClass } from '../util/createArrayClass'
import { ClassInstance } from '../class/ClassInstance'
import type { ClassLoader } from '../class/ClassLoader'
import type { ClassObject } from '../class/ClassObject'
import type { ExecutableInterface } from '../class/ExecutableInterface'
import type { InterfaceObject } from '../class/InterfaceObject'
import { getNativeClassByName } from '../../native/native'
import { BootstrapClassLoader } from '../class/BootstrapClassLoader'
import { RuntimeManager } from './RuntimeManager'
import type { NativeClassObject } from '../../native/NativeClassObject'

export enum ClassState {
	UNINITIALIZED = 0,
	INITIALIZING = 1,
	INITIALIZED = 2
}

export enum IsClassOrInterface {
	CLASS = 0,
	INTERFACE = 1,
}

export class ClassManager {
	private static instance: ClassManager | undefined = undefined

	public static construct(): void {
		ClassManager.instance = new ClassManager(BootstrapClassLoader)
	}

	public static it(): ClassManager {
		return ClassManager.instance!
	}

	private readonly isClassOrInterface = new Map<string, IsClassOrInterface>()
	private readonly classes = new Map<string, ClassObject>()
	private readonly interfaces = new Map<string, InterfaceObject>()
	private classHasBeenAdded = false
	private readonly associatedClassObjects = new Map<string, ReferenceType>()
	private readonly state = new Map<string, ClassState>()

	private constructor(private readonly loader: new () => ClassLoader) {}

	public initializeAll(): void {
		this.classes.forEach(classObject => {
			classObject.initializeIfUninitialized()
		})
		this.interfaces.forEach(interfaceObject => {
			interfaceObject.initializeIfUninitialized()
		})
	}

	public isClass(name: string): boolean {
		if (!this.tryGet(name)) return false
		return this.isClassOrInterface.get(name) === IsClassOrInterface.CLASS
	}

	public isInterface(name: string): boolean {
		if (!this.tryGet(name)) return false
		return this.isClassOrInterface.get(name) === IsClassOrInterface.INTERFACE
	}

	public addIsClassOrInterface(name: string, type: IsClassOrInterface): void {
		this.isClassOrInterface.set(name, type)
	}

	public tryGet(name: string): boolean {
		if (!this.doesClassExist(name) && !this.doesInterfaceExist(name) && !name.startsWith('[')) {
			const bootstrapLoader = new this.loader()
			bootstrapLoader.loadClassOrInterface(name + '.class')
		} else if (!this.doesClassExist(name) && name.startsWith('[')) {
			const arrayClassObject = createArrayClass(name)
			this.addIsClassOrInterface(name, IsClassOrInterface.CLASS)
			this.addClass(arrayClassObject)
		}
		return true
	}

	public doesInterfaceExist(name: string): boolean {
		return this.interfaces.has(name)
	}

	public getInterface(name: string): InterfaceObject {
		this.tryGet(name)
		const interfaceObject = this.interfaces.get(name)
		if (!interfaceObject) throw new Error(`Could not find interface ${name}`)
		return interfaceObject
	}

	public addInterface(interfaceObject: InterfaceObject): void {
		this.interfaces.set(interfaceObject.getName(), interfaceObject)
		this.state.set(interfaceObject.getName(), ClassState.UNINITIALIZED)
		if (!this.classHasBeenAdded) {
			this.associatedClassObjects.set(interfaceObject.getName(), new ReferenceType({ address: null, name: interfaceObject.getName() }))
		} else {
			this.associatedClassObjects.set(interfaceObject.getName(), this.constructAssociatedClassObject(interfaceObject.getName()))
		}
	}

	public addClass(classObject: ClassObject): void {
		this.classes.set(classObject.getName(), classObject)
		this.state.set(classObject.getName(), ClassState.UNINITIALIZED)
		if (!this.classHasBeenAdded && classObject.getName() === 'java/lang/Class') {
			this.classHasBeenAdded = true
			classObject.initializeIfUninitialized()
			for (const [name, reference] of this.associatedClassObjects) {
				if (!reference.get()) {
					this.associatedClassObjects.set(name, this.constructAssociatedClassObject(name))
				}
			}
		}
		if (!this.classHasBeenAdded) {
			this.associatedClassObjects.set(classObject.getName(), new ReferenceType({ address: null, name: classObject.getName() }))
		} else {
			this.associatedClassObjects.set(classObject.getName(), this.constructAssociatedClassObject(classObject.getName()))
		}
	}

	public doesClassExist(name: string): boolean {
		return this.classes.has(name)
	}

	public getClass(name: string): ClassObject {
		this.tryGet(name)
		const classObject = this.classes.get(name)
		if (!classObject) throw new Error(`Could not find class ${name}`)
		return classObject
	}

	public getAssociatedClassObject(name: string): ReferenceType {
		if (!this.tryGet(name)) throw new Error(`Could not get associated class for ${name} because it does not exist`)
		return this.associatedClassObjects.get(name)!
	}

	public newInstance(name: string): ClassInstance {
		const clazz = this.getClass(name)
		const classObject = cloneDeep(clazz)
		return new ClassInstance(classObject)
	}

	public getClassState(name: string): ClassState {
		const classState = this.state.get(name)
		if (isUndefined(classState)) throw new Error(`Could not get state for ${name}`)
		return classState
	}

	public updateClassState(executableInterface: ExecutableInterface, newState: ClassState): void {
		this.state.set(executableInterface.getName(), newState)
		if (this.isClass(executableInterface.getName())) {
			this.classes.set(executableInterface.getName(), executableInterface as ClassObject)
		} else {
			this.interfaces.set(executableInterface.getName(), executableInterface as InterfaceObject)
		}
	}

	public getNumberOfClassesAndInterfaces(): number {
		return this.classes.size + this.interfaces.size
	}

	public getClassWithMainMethod(): ClassObject | undefined {
		for (const clazz of this.classes.values()) {
			if (clazz.hasMain()) return clazz
		}
		return undefined
	}

	public getNativeClassByName(name: string): NativeClassObject {
		return getNativeClassByName(name)
	}

	private constructAssociatedClassObject(name: string): ReferenceType {
		const classInstance = this.newInstance('java/lang/Class')
		// FIXME: Set module
		// classInstance.putField('module')
		classInstance.putField('classLoader', new ReferenceType({ address: null, name: 'classLoader' }))
		if (this.isClass(name)) {
			classInstance.putField('classData', RuntimeManager.it().allocate(this.newInstance(name)))
		} else if (this.isInterface(name)) {
			classInstance.putField('classData', RuntimeManager.it().allocate(this.getInterface(name)))
		} else throw new Error(`Could not construct associated class object for ${name} because it is neither a class nor an interface`)
		return RuntimeManager.it().allocate(classInstance)
	}
}
