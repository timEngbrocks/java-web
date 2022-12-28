import { NativeClassObject } from '../NativeClassObject'
import { getNativeJavaLangClassByName } from './lang/native-java-lang'

export const getNativeJavaClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'lang': return getNativeJavaLangClassByName(subName)
		default: throw Error(`Could not find native java/${packageName}/${subName}`)
	}
}
