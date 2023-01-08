import * as fs from 'fs'
import { ClassFileParser } from './ClassFile.parser'
import { Lexer } from './Lexer'
import type { ClassFileHeaderData, ClassFile } from './types/ClassFile'

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

	public getClass(): ClassFile {
		return this.classFile
	}
}
