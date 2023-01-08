import type { AttributeBootstrapMethodsBootstrapMethod } from '../../parser/types/attributes/AttributeBootstrapMethods'
import type { CPInfo } from '../../parser/types/CPInfo'
import type { DataType } from '../data-types/data-type'
import type { Instruction } from '../instructions/Instruction'
import type { LocalVariables } from '../memory/LocalVariables'
import type { ExecutionContext } from '../util/ExecutionContext'
import type { MethodObject } from '../util/MethodObject'
import type { ClassInstance } from './ClassInstance'
import type { InterfaceObject } from './InterfaceObject'

export interface ExecutableInterface {
	getName: () => string
	getId: () => string
	constant: (index: number) => CPInfo<any>
	getStaticField: (name: string) => DataType<any>
	getMethod: (name: string, descriptor: string) => MethodObject
	jumpByOffset: (offset: number) => void
	setupFunctionCall: (name: string, descriptor: string, callerName: string) => void
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
	getBootstrapMethod: (index: number) => AttributeBootstrapMethodsBootstrapMethod
	getVersion: () => { major: number, minor: number }
	getInternalStacktrace: () => { class: string, method: string, pc: number }[]
	initializeIfUninitialized: () => void
	getAllFieldsInOrder: () => [key: string, value: DataType<any>, isStatic: boolean, signature: string, modifiers: number][]
	getMethods: () => MethodObject[]
	getAccessFlags: () => number
}
