import type { NativeClassObject } from '../../NativeClassObject'
import { getNativeJdkInternalMiscClassByName } from './misc/native-jdk-internal-misc'
import { getNativeJdkInternalReflectClassByName } from './reflect/native-jdk-internal-reflect'
import { getNativeJdkInternalUtilClassByName } from './util/native-jdk-internal-util'

export const getNativeJdkInternalClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'util': return getNativeJdkInternalUtilClassByName(subName)
		case 'misc': return getNativeJdkInternalMiscClassByName(subName)
		case 'reflect': return getNativeJdkInternalReflectClassByName(subName)
		default: throw Error(`Could not find native jdk/internal/${packageName}/${subName}`)
	}
}
