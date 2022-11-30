import { ClassObject } from '../../jvm/interpreter/ClassObject'
import { Runtime } from '../../jvm/interpreter/Runtime'
import { runJVM } from '../util/runJVM'

test('returns', () => {
	runJVM(['src/tests/returns/Main.class'])

	const localVariables = Runtime.classObject.currentMethod.activeFrame.localVariables

	expect(localVariables[1].get().get()).toEqual(1)
	expect(localVariables[2].get().get()).toEqual(1)
	expect(localVariables[4].get().get()).toEqual(1)
	expect(localVariables[5].get().get()).toEqual(1)
	expect((Runtime.load(localVariables[7].get().get()) as ClassObject).name).toEqual('Main')
})
