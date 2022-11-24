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
		return this.bytes.reduce((acc, x, idx) => {
			return acc | (x << (this.bytes.length - idx - 1))
		}, 0)
	}
}
