import { nop } from '../../jvm/interpreter/instructions/constants/nop'
import { InstructionStream } from '../../jvm/interpreter/InstructionStream'
import { Frame } from '../../jvm/interpreter/memory/frame'
import { getTypesFromMethodDescriptor } from '../../jvm/interpreter/util'
import { createSimpleClass } from '../util/createSimpleClass'
import { expectJVMState } from '../util/expectJVMState'
import { run } from '../util/run'

test('nop', () => {
	const name = 'Test'
	const frame = new Frame(name, 1, 0)
	const instructionStream = InstructionStream.create(name, [
		new nop()
	])
	const methods = [{
		name: 'main',
		activeFrame: frame,
		activeInstructionStream: instructionStream,
		types: getTypesFromMethodDescriptor('([java/lang/String)V')
	}]

	const classObject = createSimpleClass(name, methods)
	run(classObject, [classObject])

	expectJVMState(classObject, {
		localVariables: [],
		stack: [],
		classHeap: new Map(),
		interfaceHeap: new Map(),
		arrayHeap: new Map()
	})
})
