import { DebugManager } from '../../jvm/interpreter/manager/DebugManager'
import { runJVM } from '../util/runJVM'

test('basic-functions', () => {
	runJVM(['src/tests/basic-functions/Main.class'])

	const localVariables = DebugManager.it().getLastExecutionContext()!.localVariables

	expect(localVariables.get(1).get()).toEqual(3)
})
