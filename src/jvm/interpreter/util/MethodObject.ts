import type { InstructionStream } from '../instructions/InstructionStream'
import type { MethodTypes } from './MethodTypes'

export interface MethodObject {
	name: string
	descriptor: string
	className: string
	callerName: string
	accessFlags: number
	types: MethodTypes
	maxLocals: number
	maxStack: number
	instructionStream: InstructionStream
}
