export enum FileDescriptor {
	IN = 0,
	OUT = 1,
	ERROR = 2,
}

export enum FileAccessMode {
	READ = 0b0,
	WRITE = 0b10,
	APPEND = 0b100,
}

export class FileTable {
	private allocations = 0n
	private readonly table = new Map<number, number>()
	private readonly handles = new Map<bigint, number>()

	constructor() {
		this.open(FileDescriptor.IN, FileAccessMode.READ)
		this.open(FileDescriptor.OUT, FileAccessMode.WRITE | FileAccessMode.APPEND)
		this.open(FileDescriptor.ERROR, FileAccessMode.WRITE | FileAccessMode.APPEND)
	}

	public open(fd: number, accessMode: number): void {
		this.table.set(fd, accessMode)
	}

	public getAccessMode(fd: number): number {
		if (!this.table.has(fd)) throw new Error(`FileTable: Tried getting access mode of unknown fd: ${fd}`)
		return this.table.get(fd)!
	}

	public allocate(fd: number): bigint {
		if (!this.table.has(fd)) throw new Error(`FileTable: FD must be opened before allocating: ${fd}`)
		this.handles.set(this.allocations, fd)
		return this.allocations++
	}

	public load(handle: bigint): number {
		if (!this.handles.has(handle)) throw new Error(`FileTable: Tried loading unkown handle ${handle}`)
		return this.handles.get(handle)!
	}
}
