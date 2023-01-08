import type { NativeClassObject } from '../NativeClassObject'
import { getNativeJdkInternalClassByName } from './internal/native-jdk-interal'

export const getNativeJdkClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'internal': return getNativeJdkInternalClassByName(subName)
		default: throw Error(`Could not find native java/${packageName}/${subName}`)
	}
}
