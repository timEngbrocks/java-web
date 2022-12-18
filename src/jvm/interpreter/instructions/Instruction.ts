export class Instruction {
	length: number = NaN
	args: string = ''
	public setArgs(args: string): void {}
	public execute(): void {}
	public toString(): string {
		return 'invalid'
	}
}
