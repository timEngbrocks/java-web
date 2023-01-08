import { DebugManager } from '../../jvm/interpreter/manager/DebugManager'
import { runJVM } from '../util/runJVM'

test('basic-comparisons', () => {
	runJVM(['src/tests/basic-comparisons/Main.class'])

	const localVariables = DebugManager.it().getLastExecutionContext()!.localVariables

	expect(localVariables.get(1).get()).toEqual(1)
	expect(localVariables.get(2).get()).toEqual(1)
	expect(localVariables.get(3).get()).toEqual(1)
	expect(localVariables.get(4).get()).toEqual(1)
	expect(localVariables.get(5).get()).toEqual(1)
	expect(localVariables.get(6).get()).toEqual(1)
})
