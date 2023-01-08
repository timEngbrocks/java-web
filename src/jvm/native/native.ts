import { getNativeJavaClassByName } from './java/native-java'
import { getNativeJdkClassByName } from './jdk/native-jdk'
import type { NativeClassObject } from './NativeClassObject'

export const getNativeClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'java': return getNativeJavaClassByName(subName)
		case 'jdk': return getNativeJdkClassByName(subName)
		default: throw Error(`Could not find native ${packageName}/${subName}`)
	}
}
