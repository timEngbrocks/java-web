import { DebugManager } from '../../jvm/interpreter/manager/DebugManager'
import { runJVM } from '../util/runJVM'

test('basic-instances', () => {
	runJVM([
		'src/tests/basic-instances/Main.class',
		'src/tests/basic-instances/Container.class'
	])

	const localVariables = DebugManager.it().getLastExecutionContext()!.localVariables

	expect(localVariables.get(2).get()).toEqual(1)
})
