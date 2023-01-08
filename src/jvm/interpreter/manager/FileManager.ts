import { FileTable } from '../memory/FileTable'

export class FileManager {
	private static instance: FileManager | undefined = undefined

	public static construct(): void {
		FileManager.instance = new FileManager()
	}

	public static it(): FileManager {
		return FileManager.instance!
	}

	private readonly fileTable = new FileTable()

	public openFD(fd: number, accessMode: number): void {
		this.fileTable.open(fd, accessMode)
	}

	public getAccessMode(fd: number): number {
		return this.fileTable.getAccessMode(fd)
	}

	public allocateFD(fd: number): bigint {
		return this.fileTable.allocate(fd)
	}

	public loadFD(handle: bigint): number {
		return this.fileTable.load(handle)
	}
}
