import { ClassObject } from '../../jvm/interpreter/class/ClassObject'
import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('returns', () => {
	runJVM(['src/tests/returns/Main.class'])

	const localVariables = Runtime.it().get_debug_lastExecutionContext().localVariables

	expect(localVariables.get(1).get()).toEqual(1)
	expect(localVariables.get(2).get()).toEqual(1)
	expect(localVariables.get(4).get()).toEqual(1)
	expect(localVariables.get(5).get()).toEqual(1)
	expect((Runtime.it().load(localVariables.get(7).get()) as ClassObject).getName()).toEqual('Main')
})
