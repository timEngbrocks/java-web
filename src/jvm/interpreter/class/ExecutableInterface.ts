import { CPInfo } from '../../parser/types/CPInfo'
import { DataType } from '../data-types/data-type'
import { Instruction } from '../instructions/Instruction'
import { LocalVariables } from '../memory/LocalVariables'
import { ExecutionContext } from '../util/ExecutionContext'
import { MethodObject } from '../util/MethodObject'
import { ClassInstance } from './ClassInstance'
import { InterfaceObject } from './InterfaceObject'

export interface ExecutableInterface {
	getName: () => string
	getId: () => string
	constant: (index: number) => CPInfo<any>
	getStaticField: (name: string) => DataType<any>
	getMethod: (name: string, descriptor: string) => MethodObject
	jumpByOffset: (offset: number) => void
	setupFunctionCall: (name: string, descriptor: string) => void
	executeFunctionCall: () => void
	returnFromFunction: () => void
	setReturnValueOnSelf: (value: DataType<any>) => void
	push: (value: DataType<any>) => void
	pop: () => DataType<any>
	setLocal: (value: DataType<any>, index: number) => void
	getLocal: (index: number) => DataType<any>
	currentMethodHasNext: () => boolean
	currentMethodNext: () => Instruction
	hasCurrentMethod: () => boolean
	currentMethod: () => ExecutionContext
	currentPC: () => number
	setPC: (pc: number) => void
	allCurrentLocals: () => LocalVariables
	operandStackOverview: () => string
	getSuperClass: () => ClassInstance | undefined
	getSuperInterfaces: () => Set<InterfaceObject>
	hasSuperInterface: (superInterface: InterfaceObject) => boolean
	getStaticFields: () => Map<string, DataType<any>>
}
