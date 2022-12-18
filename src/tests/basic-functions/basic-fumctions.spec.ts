import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('basic-functions', () => {
	runJVM(['src/tests/basic-functions/Main.class'])

	const localVariables = Runtime.it().get_debug_lastExecutionContext().localVariables

	expect(localVariables.get(1).get()).toEqual(3)
})
