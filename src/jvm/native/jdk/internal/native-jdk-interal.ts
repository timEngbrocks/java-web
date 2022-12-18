import { NativeClassObject } from '../../NativeClassObject'
import { getNativeJdkInternalUtilClassByName } from './util/native-jdk-internal-util'

export const getNativeJdkInternalClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'util': return getNativeJdkInternalUtilClassByName(subName)
		default: throw Error(`Could not find native jdk/internal/${subName}`)
	}
}
