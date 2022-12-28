import { ArrayType, ReferenceType } from '../../../interpreter/data-types/data-type'
import { int } from '../../../interpreter/data-types/int'
import { Runtime } from '../../../interpreter/Runtime'
import { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeSystem extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': return this.nativeRegisterNatives()
			case 'arraycopy': return this.nativeArraycopy(executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeRegisterNatives(): void {}

	private nativeArraycopy(executionContext: ExecutionContext): void {
		const srcRef = executionContext.localVariables.get(0) as ReferenceType
		const srcPos = executionContext.localVariables.get(1) as int
		const destRef = executionContext.localVariables.get(2) as ReferenceType
		const destPos = executionContext.localVariables.get(3) as int
		const length = executionContext.localVariables.get(4) as int

		if (!srcRef.get() || !destRef.get()) throw new Error(`Null dereference in native System.arraycopy: ${srcRef}, ${destRef}`)
		const src = Runtime.it().load(srcRef) as ArrayType
		const dest = Runtime.it().load(destRef) as ArrayType
		if ((srcPos.get() as number) + (length.get() as number) > src.get().length) throw new Error(`native System.arraycopy: outofbounds: ${srcPos}, ${length}, ${src}`)
		if (src.type.toString() !== dest.type.toString()) throw new Error(`native System.arraycopy: type mismatch: ${src}, ${dest}`)
		const elements = src.get().slice(srcPos.get() as number, (srcPos.get() as number) + (length.get() as number))
		for (let i = 0; i < (length.get() as number); i++) dest.get()[i + (destPos.get() as number)] = elements[i]
	}

	public toString(): string {
		return 'native java/lang/System'
	}
}
