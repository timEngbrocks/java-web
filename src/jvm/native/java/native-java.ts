import type { NativeClassObject } from '../NativeClassObject'
import { getNativeJavaIOClassByName } from './io/native-java-io'
import { getNativeJavaLangClassByName } from './lang/native-java-lang'
import { getNativeJavaSecurityClassByName } from './security/native-java-security'

export const getNativeJavaClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'lang': return getNativeJavaLangClassByName(subName)
		case 'security': return getNativeJavaSecurityClassByName(subName)
		case 'io': return getNativeJavaIOClassByName(subName)
		default: throw Error(`Could not find native java/${packageName}/${subName}`)
	}
}
