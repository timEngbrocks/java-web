import { ClassObject } from '../ClassObject'
import { ClassType } from './data-type'

export class classType extends ClassType {
	public isWide: boolean = false

	private value: ClassObject = new ClassObject()
	public get(): ClassObject {
		return this.value
	}

	public set(value: ClassObject): void {
		this.value = value
	}

	public toString(): string { return 'class' }
}
