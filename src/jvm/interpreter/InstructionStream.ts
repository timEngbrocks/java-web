import { Instruction } from "./Instruction";
import { getComparisonInstructionByCode } from "./instructions/comparisons/comparison-instructions";
import { getConstantInstructionByCode } from "./instructions/constants/constant-instructions";
import { getControlInstructionByCode } from "./instructions/control/control-instructions";
import { getConversionInstructionByCode } from "./instructions/conversions/conversion-instructions";
import { getExtendedInstructionByCode } from "./instructions/extended/extended-instructions";
import { getLoadInstructionByCode } from "./instructions/loads/load-instructions";
import { getMathInstructionByCode } from "./instructions/math/math-instructions";
import { getReferenceInstructionByCode } from "./instructions/references/reference-instructions";
import { getReservedInstructionByCode } from "./instructions/reserved/reserved-instructions";
import { getStackInstructionByCode } from "./instructions/stack/stack-instructions";
import { getStoreInstructionByCode } from "./instructions/stores/store-instructions";

const instructionTypes = [
    getConstantInstructionByCode,
    getLoadInstructionByCode,
    getStoreInstructionByCode,
    getStackInstructionByCode,
    getMathInstructionByCode,
    getConversionInstructionByCode,
    getConversionInstructionByCode,
    getReferenceInstructionByCode,
    getControlInstructionByCode,
    getExtendedInstructionByCode,
    getReservedInstructionByCode
]
const getInstructionByCode = (code: string): Instruction => {
    for (const instructionType of instructionTypes) {
       const instruction =  instructionType(code)
       if (instruction.toString() != 'invalid') return instruction
    }
    console.log(`Unimplemented opcode: 0x${code.substring(0, 2)}`)
    return new Instruction()
}

export class InstructionStream {

    private name: string = ''
    private pc: number = 0
    private stream: Instruction[]

    constructor(name: string, code: string) {
        this.name = name
        this.stream = this.parseCode(code)
    }

    public getName(): string {
        return this.name
    }

    public next(): Instruction {
        const instruction = this.stream[this.pc]
        this.pc += instruction.length
        return instruction
    }

    public hasNext(): boolean {
        return this.pc < this.stream.length
    }

    public getPC(): number {
        return this.pc
    }

    public setPC(pc: number): void {
        this.pc = pc
    }

    public setOffset(offset: number): void {
        this.pc += offset
    }

    private parseCode(code: string): Instruction[] {
        const instructions: Instruction[] = []

        let cursor = 0
        while (cursor < code.length) {
            const instruction = getInstructionByCode(code.substring(cursor))
            instructions.push(instruction)
            for (let i = 0; i < instruction.length - 1; i++) instructions.push(new Instruction())
            cursor += instruction.length * 2
        }

        return instructions
    }
}