import { ClassObjectManager } from '../../../../interpreter/class/ClassObjectManager'
import { byte } from '../../../../interpreter/data-types/byte'
import { ArrayType } from '../../../../interpreter/data-types/data-type'
import { int } from '../../../../interpreter/data-types/int'
import { long } from '../../../../interpreter/data-types/long'
import { Runtime } from '../../../../interpreter/Runtime'
import { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeCDS extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'isDumpingClassList0': return this.nativeIsDumpingClassList0(executionContext)
			case 'isDumpingArchive0': return this.nativeIsDumpingArchive0(executionContext)
			case 'isSharingEnabled0': return this.nativeIsSharingEnabled0(executionContext)
			case 'getRandomSeedForDumping': return this.nativeGetRandomSeedForDumping(executionContext)
			case 'initializeFromArchive': return this.nativeInitializeFromArchive()
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeIsDumpingClassList0(executionContext: ExecutionContext): void {
		// FIXME: ?????
		executionContext.operandStack.push(new int(0))
	}

	private nativeIsDumpingArchive0(executionContext: ExecutionContext): void {
		// FIXME: ?????
		executionContext.operandStack.push(new int(0))
	}

	private nativeIsSharingEnabled0(executionContext: ExecutionContext): void {
		// FIXME: ?????
		executionContext.operandStack.push(new int(0))
	}

	private nativeGetRandomSeedForDumping(executionContext: ExecutionContext): void {
		const release = '21-internal-adhoc.tim.jdk'
		const dbgLevel = 'release'
		const version = 'OpenJDK 64-Bit Client VM'
		let seed = BigInt(this.hashString(release) ^ this.hashString(dbgLevel) ^ this.hashString(version))
		const vmMajorVersion = '21'
		const vmMinorVersion = '0'
		const vmSecurityVersion = '0'
		const vmPatchVersion = '0'
		seed += BigInt(Number.parseInt(vmMajorVersion))
		seed += BigInt(Number.parseInt(vmMinorVersion))
		seed += BigInt(Number.parseInt(vmSecurityVersion))
		seed += BigInt(Number.parseInt(vmPatchVersion))
		if (seed === 0n) seed = 0x87654321n
		executionContext.operandStack.push(new long(seed))
	}

	private nativeInitializeFromArchive(): void {}

	public toString(): string {
		return 'native jdk/internal/misc/CDS'
	}

	private hashString(text: string): number {
		// FIXME: this probably shouldn't use \0
		const stringClass = ClassObjectManager.newInstance('java/lang/String')
		if (!stringClass) throw new Error('ldc could not find java/lang/String')
		const stringValue = new ArrayType(new byte())
		for (let i = 0; i < text.length; i++) {
			stringValue.get().push(Runtime.it().allocate(new byte(text.charCodeAt(i))))
		}
		stringClass.putField('value', Runtime.it().allocate(stringValue))
		Runtime.it().setupExecuteOutOfOrderWithReturn()
		Runtime.it().setupFunctionCall(stringClass, 'hashCode', '()I')
		Runtime.it().executeFunctionCall(stringClass)
		const classStack = Runtime.it().callExecuteOutOfOrder()
		return (classStack.current().pop() as int).get() as number
	}
}
