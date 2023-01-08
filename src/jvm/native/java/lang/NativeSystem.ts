import type { ArrayType } from '../../../interpreter/data-types/ArrayType'
import type { int } from '../../../interpreter/data-types/int'
import type { ReferenceType } from '../../../interpreter/data-types/ReferenceType'
import { ClassManager } from '../../../interpreter/manager/ClassManager'
import { RuntimeManager } from '../../../interpreter/manager/RuntimeManager'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeSystem extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'registerNatives': {
				this.nativeRegisterNatives()
				break
			}
			case 'arraycopy': {
				this.nativeArraycopy(executionContext)
				break
			}
			case 'setIn0': {
				this.nativeSetIn0(executionContext)
				break
			}
			case 'setOut0': {
				this.nativeSetOut0(executionContext)
				break
			}
			case 'setErr0': {
				this.nativeSetErr0(executionContext)
				break
			}
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
		const src = RuntimeManager.it().load(srcRef) as ArrayType
		const dest = RuntimeManager.it().load(destRef) as ArrayType
		if ((srcPos.get() as number) + (length.get() as number) > src.get().length) throw new Error(`native System.arraycopy: outofbounds: ${srcPos}, ${length}, ${src}`)
		if (src.type.toString() !== dest.type.toString()) throw new Error(`native System.arraycopy: type mismatch: ${src}, ${dest}`)
		const elements = src.get().slice(srcPos.get() as number, (srcPos.get() as number) + (length.get() as number))
		for (let i = 0; i < (length.get() as number); i++) dest.get()[i + (destPos.get() as number)] = elements[i]
	}

	private nativeSetIn0(executionContext: ExecutionContext): void {
		const inRef = executionContext.localVariables.get(0) as ReferenceType
		const systemClass = ClassManager.it().getClass('java/lang/System')
		systemClass.putStaticField('in', inRef)
	}

	private nativeSetOut0(executionContext: ExecutionContext): void {
		const outRef = executionContext.localVariables.get(0) as ReferenceType
		const systemClass = ClassManager.it().getClass('java/lang/System')
		systemClass.putStaticField('out', outRef)
	}

	private nativeSetErr0(executionContext: ExecutionContext): void {
		const errRef = executionContext.localVariables.get(0) as ReferenceType
		const systemClass = ClassManager.it().getClass('java/lang/System')
		systemClass.putStaticField('err', errRef)
	}

	public toString(): string {
		return 'native java/lang/System'
	}
}
