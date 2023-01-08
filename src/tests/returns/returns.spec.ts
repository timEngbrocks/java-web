import type { ClassInstance } from '../../jvm/interpreter/class/ClassInstance'
import { DebugManager } from '../../jvm/interpreter/manager/DebugManager'
import { RuntimeManager } from '../../jvm/interpreter/manager/RuntimeManager'
import { runJVM } from '../util/runJVM'

test('returns', () => {
	runJVM(['src/tests/returns/Main.class'])

	const localVariables = DebugManager.it().getLastExecutionContext()!.localVariables

	expect(localVariables.get(1).get()).toEqual(1)
	expect(localVariables.get(2).get()).toEqual(1)
	expect(localVariables.get(4).get()).toEqual(1)
	expect(localVariables.get(5).get()).toEqual(1)
	expect((RuntimeManager.it().load(localVariables.get(7).get()) as ClassInstance).getName()).toEqual('Main')
})
