import * as fs from 'fs'
import { ClassFileParser } from './ClassFile.parser'
import { Lexer } from './Lexer'
import { ClassFileHeaderData, ClassFile } from './types/ClassFile'
import { CPInfo } from './types/CPInfo'

export type ConstantResolver = (index: number) => CPInfo<any>

export class Parser {
	private readonly lexer: Lexer

	classFileHeader: ClassFileHeaderData
	classFile: ClassFile

	constructor(path: string) {
		const buffer = fs.readFileSync(path)
		this.lexer = new Lexer(buffer)
		this.classFileHeader = ClassFileParser.preParse(this.lexer)
		this.classFile = ClassFileParser.parse(this.lexer, this.classFileHeader)
	}

	public resolveConstant(index: number): CPInfo<any> {
		return this.classFileHeader.constantPool[index - 1]
	}

	public getClass(): ClassFile {
		return this.classFile
	}
}
