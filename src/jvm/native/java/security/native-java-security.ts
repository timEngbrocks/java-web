import type { NativeClassObject } from '../../NativeClassObject'
import { NativeAccessController } from './AccessController'

export const getNativeJavaSecurityClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'AccessController': return new NativeAccessController()
		default: throw Error(`Could not find native java/lang/${name}`)
	}
}
