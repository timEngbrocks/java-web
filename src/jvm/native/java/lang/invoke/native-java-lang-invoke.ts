import type { NativeClassObject } from '../../../NativeClassObject'
import { NativeMethodHandleNatives } from './NativeMethodHandleNatives'

export const getNativeJavaLangInvokeClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'MethodHandleNatives': return new NativeMethodHandleNatives()
		default: throw Error(`Could not find native java/lang/invoke/${name}`)
	}
}
