import { ByteStream } from "./byte-stream"

export class Lexer {
    private cursor: number = 0
    private buffer: Buffer

    constructor(buffer: Buffer) {
        this.buffer = buffer
    }

    public read(length: number): ByteStream {
        const out = this.peek(length)
        this.cursor += length
        return out
    }

    public peek(length: number): ByteStream {
        const out: Uint8Array = new Uint8Array(length)
        for (let i = 0; i < length; i++) {
            out[i] = this.buffer.readUint8(this.cursor + i)
            if (out[i] === undefined) {
                throw 'OutOfBounds read'
            }
        }
        return new ByteStream(out)
    }

    public hasNext(length: number = 0): boolean {
        return (this.cursor + length) < this.buffer.length
    }

    public remaining(): number {
        return this.buffer.length - this.cursor
    }

}