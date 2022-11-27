import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('basic-functions', () => {
	runJVM(['src/tests/basic-functions/Main.class'])

	const localVariables = Runtime.classObject.currentMethod.activeFrame.localVariables

	expect(localVariables[1].get().get()).toEqual(3)
})
