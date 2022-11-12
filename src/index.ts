import * as fs from 'fs';
import { JVMService } from './jvm/JVM';
import { Lexer } from './lexer';
import { Parser } from './parser/parser';

const buffer = fs.readFileSync('Main.class')
const lexer = new Lexer(buffer)
const parser = new Parser(lexer)
const jvm = JVMService.get()
jvm.run([parser.classFile])