import { ClassManager } from '../interpreter/manager/ClassManager'

export enum VMUniverseStatus {
	UNINITIALIZED,
	INITIALIZED
}

export class VMUniverse {
	private status = VMUniverseStatus.UNINITIALIZED

	public getStatus(): VMUniverseStatus {
		return this.status
	}

	public genesis(): void {
		// FIXME: initialize string constants
		this.initializeBasicTypes()
		this.status = VMUniverseStatus.INITIALIZED
	}

	public setMainThreadGroup(): void {}

	private initializeBasicTypes(): void {
		this.initializeType('[Ljdk/internal/vm/FillerArray;')
		this.initializeType('[Z')
		this.initializeType('[C')
		this.initializeType('[F')
		this.initializeType('[D')
		this.initializeType('[B')
		this.initializeType('[S')
		this.initializeType('[I')
		this.initializeType('[J')
		this.initializeType('[java/lang/Object;')
	}

	private initializeType(name: string): void {
		const type = ClassManager.it().getClass(name)
		type.initializeIfUninitialized()
	}
}
