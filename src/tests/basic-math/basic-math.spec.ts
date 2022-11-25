import { Runtime } from '../../jvm/interpreter/Runtime'
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

	const localVariables = Runtime.classObject.currentMethod.activeFrame.localVariables

	expect(localVariables[13].get().get()).toEqual(intAdd)
	expect(localVariables[14].get().get()).toEqual(longAdd)
	expect(localVariables[16].get().get()).toEqual(floatAdd)
	expect(localVariables[17].get().get()).toEqual(dobuleAdd)

	expect(localVariables[19].get().get()).toEqual(intSub)
	expect(localVariables[20].get().get()).toEqual(longSub)
	expect(localVariables[22].get().get()).toEqual(floatSub)
	expect(localVariables[23].get().get()).toEqual(dobuleSub)

	expect(localVariables[25].get().get()).toEqual(intMul)
	expect(localVariables[26].get().get()).toEqual(longMul)
	expect(localVariables[28].get().get()).toEqual(floatMul)
	expect(localVariables[29].get().get()).toEqual(dobuleMul)

	expect(localVariables[31].get().get()).toEqual(intDiv)
	expect(localVariables[32].get().get()).toEqual(longDiv)
	expect(localVariables[34].get().get()).toEqual(floatDiv)
	expect(localVariables[35].get().get()).toEqual(dobuleDiv)
})
