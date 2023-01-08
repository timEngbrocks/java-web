import { DebugManager } from '../../jvm/interpreter/manager/DebugManager'
import { runJVM } from '../util/runJVM'

test('basic-math', () => {
	runJVM(['src/tests/basic-math/Main.class'])

	const a = 1
	const b = 2
	const c = 1n
	const d = 2n
	const e = 1.0
	const f = 2.0
	const g = 1.0
	const h = 2.0

	const intAdd = a + b
	const longAdd = c + d
	const floatAdd = e + f
	const dobuleAdd = g + h

	const intSub = a - b
	const longSub = c - d
	const floatSub = e - f
	const dobuleSub = g - h

	const intMul = a * b
	const longMul = c * d
	const floatMul = e * f
	const dobuleMul = g * h

	const intDiv = Math.floor(a / b)
	const longDiv = c / d
	const floatDiv = e / f
	const dobuleDiv = g / h

	const localVariables = DebugManager.it().getLastExecutionContext()!.localVariables

	expect(localVariables.get(13).get()).toEqual(intAdd)
	expect(localVariables.get(14).get()).toEqual(longAdd)
	expect(localVariables.get(16).get()).toEqual(floatAdd)
	expect(localVariables.get(17).get()).toEqual(dobuleAdd)

	expect(localVariables.get(19).get()).toEqual(intSub)
	expect(localVariables.get(20).get()).toEqual(longSub)
	expect(localVariables.get(22).get()).toEqual(floatSub)
	expect(localVariables.get(23).get()).toEqual(dobuleSub)

	expect(localVariables.get(25).get()).toEqual(intMul)
	expect(localVariables.get(26).get()).toEqual(longMul)
	expect(localVariables.get(28).get()).toEqual(floatMul)
	expect(localVariables.get(29).get()).toEqual(dobuleMul)

	expect(localVariables.get(31).get()).toEqual(intDiv)
	expect(localVariables.get(32).get()).toEqual(longDiv)
	expect(localVariables.get(34).get()).toEqual(floatDiv)
	expect(localVariables.get(35).get()).toEqual(dobuleDiv)
})
