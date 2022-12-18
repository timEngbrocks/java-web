import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('basic-instances', () => {
	runJVM([
		'src/tests/basic-instances/Main.class',
		'src/tests/basic-instances/Container.class'
	])

	const localVariables = Runtime.it().get_debug_lastExecutionContext().localVariables

	expect(localVariables.get(2).get()).toEqual(1)
})
