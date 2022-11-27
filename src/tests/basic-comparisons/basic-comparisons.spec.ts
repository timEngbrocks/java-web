import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('basic-comparisons', () => {
	runJVM(['src/tests/basic-comparisons/Main.class'])

	const localVariables = Runtime.classObject.currentMethod.activeFrame.localVariables

	expect(localVariables[1].get().get()).toEqual(1)
	expect(localVariables[2].get().get()).toEqual(1)
	expect(localVariables[3].get().get()).toEqual(1)
	expect(localVariables[4].get().get()).toEqual(1)
	expect(localVariables[5].get().get()).toEqual(1)
	expect(localVariables[6].get().get()).toEqual(1)
})
