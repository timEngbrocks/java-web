import type { ReferenceType } from '../data-types/ReferenceType'
import type { InstructionStream } from '../instructions/InstructionStream'
import type { LocalVariables } from '../memory/LocalVariables'
import type { OperandStack } from '../memory/operand-stack'
import type { MethodObject } from './MethodObject'

export interface ExecutionContext {
	instructionStream: InstructionStream
	operandStack: OperandStack
	localVariables: LocalVariables
	methodObject: MethodObject
	callerReference: ReferenceType
}
