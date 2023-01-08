import type { NativeClassObject } from '../../../NativeClassObject'
import { NativeFinalizer } from './NativeFinalizer'

export const getNativeJavaLangRefClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'Finalizer': return new NativeFinalizer()
		default: throw Error(`Could not find native java/lang/${name}`)
	}
}
