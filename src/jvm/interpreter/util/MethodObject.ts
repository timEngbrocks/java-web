import { InstructionStream } from '../instructions/InstructionStream'
import { MethodTypes } from './MethodTypes'

export interface MethodObject {
	name: string
	descriptor: string
	className: string
	accessFlags: number
	types: MethodTypes
	maxLocals: number
	maxStack: number
	instructionStream: InstructionStream
}
