import { double } from '../../../interpreter/data-types/double'
import { long } from '../../../interpreter/data-types/long'
import type { ExecutionContext } from '../../../interpreter/util/ExecutionContext'
import type { MethodObject } from '../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../NativeClassObject'

export class NativeDouble extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'doubleToRawLongBits': {
				this.nativeDoubleToRawLongBits(executionContext)
				break
			}
			case 'longBitsToDouble': {
				this.nativeLongBitsToDouble(executionContext)
				break
			}
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativeDoubleToRawLongBits(executionContext: ExecutionContext): void {
		const value = (executionContext.localVariables.get(0) as double).get() as number
		if (value === double.positiveInfinity) executionContext.operandStack.push(new long(0x7ff0000000000000n))
		else if (value === double.negativeInfinity) executionContext.operandStack.push(new long(0xfff0000000000000n))
		else {
			const wholePart = Math.floor(value)
			const decimalPart = value - wholePart
			const conversionFactor = 2 * (decimalPart.toString(2).length - 2)
			const scientificNotation = (value / Math.pow(2, conversionFactor)).toString(2)
			const sign = value >= 0 ? '0' : '1'
			const exponent = (127 + conversionFactor).toString(2).padEnd(11, '0')
			const mantissa = scientificNotation.substring(2).padEnd(52, '0')
			const result = Number.parseInt(sign + exponent + mantissa, 2)
			executionContext.operandStack.push(new long(BigInt(result)))
		}
	}

	private nativeLongBitsToDouble(executionContext: ExecutionContext): void {
		const value = (executionContext.localVariables.get(0) as long).get() as bigint
		if (value === 0x7ff0000000000000n) executionContext.operandStack.push(new double(double.positiveInfinity))
		else if (value === 0xfff0000000000000n) executionContext.operandStack.push(new double(double.negativeInfinity))
		else if ((value >= 0x7ff0000000000001n && value <= 0x7fffffffffffffffn) || (value >= 0xfff0000000000001n && value <= 0xffffffffffffffffn)) executionContext.operandStack.push(new double(double.NaN))
		else {
			const s = ((value >> 63n) === 0n) ? 1n : -1n
			const e = ((value >> 52n) & 0x7ffn)
			const m = (e === 0n) ? (value & 0xfffffffffffffn) << 1n : (value & 0xfffffffffffffn) | 0x10000000000000n
			const result = s * m * BigInt(Math.pow(2, Number(e - 1075n)))
			executionContext.operandStack.push(new double(result))
		}
	}

	public toString(): string {
		return 'native java/lang/Double'
	}
}
