import { float } from '../../../interpreter/data-types/float'
import { int } from '../../../interpreter/data-types/int'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeFloat extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'floatToRawIntBits': {
				this.nativeFloatToRawIntBits(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeFloatToRawIntBits(executionContext: ExecutionContext): void {
		const value = (executionContext.localVariables.get(0) as float).get() as number
		if (value === float.positiveInfinity) executionContext.operandStack.push(new int(0x7f800000))
		else if (value === float.negativeInfinity) executionContext.operandStack.push(new int(0xff800000))
		else {
			const wholePart = Math.floor(value)
			const decimalPart = value - wholePart
			const conversionFactor = 2 * (decimalPart.toString(2).length - 2)
			const scientificNotation = (value / Math.pow(2, conversionFactor)).toString(2)
			const sign = value >= 0 ? '0' : '1'
			const exponent = (127 + conversionFactor).toString(2).padEnd(8, '0')
			const mantissa = scientificNotation.substring(2).padEnd(23, '0')
			const result = Number.parseInt(sign + exponent + mantissa, 2)
			executionContext.operandStack.push(new int(result))
		}
	}

	public toString(): string {
		return 'native java/lang/Float'
	}
}
