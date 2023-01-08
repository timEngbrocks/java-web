import type { NativeClassObject } from '../../NativeClassObject'
import { NativeFileDescriptor } from './NativeFileDescriptor'

export const getNativeJavaIOClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'FileDescriptor': return new NativeFileDescriptor()
		default: throw Error(`Could not find native java/lang/${name}`)
	}
}
