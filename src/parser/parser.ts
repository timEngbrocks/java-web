import { Lexer } from "../lexer";
import { ClassFile, ClassFileHeaderData } from "../types/ClassFile";
import { CPInfo } from "../types/CPInfo";
import { ClassFileParser } from "./ClassFile.parser";

export type ConstantResolver = (index: number) => CPInfo<any>

export class Parser {
    classFileHeader: ClassFileHeaderData
    classFile: ClassFile

    constructor(lexer: Lexer) {
        this.classFileHeader = ClassFileParser.preParse(lexer)
        this.classFile = ClassFileParser.parse(lexer, this.classFileHeader)
    }

    public resolveConstant(index: number): CPInfo<any> {
        return this.classFileHeader.constantPool[index - 1]
    }

}