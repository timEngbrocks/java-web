
import { InstructionStream } from '../instructions/InstructionStream'
import { LocalVariables } from '../memory/LocalVariables'
import { OperandStack } from '../memory/operand-stack'
import { MethodObject } from './MethodObject'

export interface ExecutionContext {
	instructionStream: InstructionStream
	operandStack: OperandStack
	localVariables: LocalVariables
	methodObject: MethodObject
}
