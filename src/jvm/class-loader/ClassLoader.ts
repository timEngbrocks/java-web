import * as fs from 'fs'
import { Lexer } from './parser/Lexer'
import { Parser } from './parser/Parser'
import { ClassFile } from './parser/types/ClassFile'

export class ClassLoader {
	private readonly lexer: Lexer
	private readonly parser: Parser

	private readonly classFile: ClassFile

	constructor(path: string) {
		const buffer = fs.readFileSync(path)
		this.lexer = new Lexer(buffer)
		this.parser = new Parser(this.lexer)
		this.classFile = this.parser.classFile
	}

	public getClass(): ClassFile {
		return this.classFile
	}
}
