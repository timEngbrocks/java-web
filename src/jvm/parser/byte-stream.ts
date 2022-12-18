import { map } from 'lodash'

export class ByteStream {
	bytes: Uint8Array

	constructor(bytes: Uint8Array) {
		this.bytes = bytes
	}

	public length(): number {
		return this.bytes.length
	}

	public toString(): string {
		return map(this.bytes, x => String.fromCharCode(x)).join()
	}

	public toBinaryString(): string {
		return map(this.bytes, x => x.toString(2).padStart(8, '0')).join('')
	}

	public toHexString(): string {
		return map(this.bytes, x => x.toString(16).padStart(2, '0')).join('')
	}

	public toNumber(): number {
		let value = 0
		let exponent = 1
		const binary = this.toBinaryString()
		for (let i = binary.length - 1; i > 0; i--) {
			value += Number.parseInt(binary[i]) * exponent
			exponent *= 2
		}
		return value + Number.parseInt(binary[0]) * exponent * (-1)
	}
}
