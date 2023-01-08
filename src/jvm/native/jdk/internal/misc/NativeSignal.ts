import { map } from 'lodash'
import type { ClassInstance } from '../../../../interpreter/class/ClassInstance'
import type { ArrayType } from '../../../../interpreter/data-types/ArrayType'
import type { ReferenceType } from '../../../../interpreter/data-types/ReferenceType'
import type { byte } from '../../../../interpreter/data-types/byte'
import { RuntimeManager } from '../../../../interpreter/manager/RuntimeManager'
import type { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'
import { int } from '../../../../interpreter/data-types/int'
import type { long } from '../../../../interpreter/data-types/long'

export const SignalNumbers: Record<string, number> = {
	HUP: 1,
	INT: 2,
	QUIT: 3,
	ILL: 4,
	TRAP: 5,
	ABRT: 6,
	EMT: 7,
	FPE: 8,
	KILL: 9,
	BUS: 10,
	SEGV: 11,
	SYS: 12,
	PIPE: 13,
	ALRM: 14,
	TERM: 15,
	URG: 16,
	STOP: 17,
	TSTP: 18,
	CONT: 19,
	CHLD: 20,
	TTIN: 21,
	TTOU: 22,
	IO: 23,
	XCPU: 24,
	XFSZ: 25,
	VTALRM: 26,
	PROF: 27,
	WINCH: 28,
	PWR: 29,
	USR1: 30,
	USR2: 31,
	RTMIN: 32,
	'RTMIN+1': 33,
	'RTMIN+2': 34,
	'RTMIN+3': 35,
	'RTMIN+4': 36,
	'RTMIN+5': 37,
	'RTMIN+6': 38,
	'RTMIN+7': 39,
	'RTMIN+8': 40,
	'RTMIN+9': 41,
	'RTMIN+10': 42,
	'RTMIN+11': 43,
	'RTMIN+12': 44,
	'RTMIN+13': 45,
	'RTMIN+14': 46,
	'RTMIN+15': 47,
	'RTMIN+16': 48,
	'RTMAX-15': 49,
	'RTMAX-14': 50,
	'RTMAX-13': 51,
	'RTMAX-12': 52,
	'RTMAX-11': 53,
	'RTMAX-10': 54,
	'RTMAX-9': 55,
	'RTMAX-8': 56,
	'RTMAX-7': 57,
	'RTMAX-6': 58,
	'RTMAX-5': 59,
	'RTMAX-4': 60,
	'RTMAX-3': 61,
	'RTMAX-2': 62,
	'RTMAX-1': 63,
	RTMAX: 64
}

export class NativeSignal extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'findSignal0': {
				this.nativeFindSignal0(executionContext)
				break
			}
			case 'handle0': {
				this.nativeHandle0(executionContext)
				break
			}
			case 'raise0': {
				this.nativeRaise0(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeFindSignal0(executionContext: ExecutionContext): void {
		const stringReference = executionContext.localVariables.get(0) as ReferenceType
		const stringClass = RuntimeManager.it().load(stringReference) as ClassInstance
		const valueRef = stringClass.getField('value') as ReferenceType
		const value = RuntimeManager.it().load(valueRef) as ArrayType
		const bytes = []
		for (const reference of value.get()) {
			const byte = RuntimeManager.it().load(reference) as byte
			bytes.push(byte.get() as number)
		}
		const name = map(bytes, x => String.fromCharCode(x)).join().split(',').join('')
		const number = SignalNumbers[name]
		executionContext.operandStack.push(new int(number))
	}

	private nativeHandle0(executionContext: ExecutionContext): void {
		const nativeH = executionContext.localVariables.get(1) as long
		executionContext.operandStack.push(nativeH)
	}

	private nativeRaise0(_executionContext: ExecutionContext): void {
		throw new Error('impl')
	}

	public toString(): string {
		return 'native jdk/internal/misc/Signal'
	}
}
