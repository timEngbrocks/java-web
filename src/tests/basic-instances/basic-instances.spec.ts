import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('basic-instances', () => {
	runJVM([
		'src/tests/basic-instances/Main.class',
		'src/tests/basic-instances/Container.class'
	])

	const localVariables = Runtime.classObject.currentMethod.activeFrame.localVariables

	expect(localVariables[2].get().get()).toEqual(1)
})
