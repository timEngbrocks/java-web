import type { NativeClassObject } from '../../NativeClassObject'
import { NativeFileDescriptor } from './NativeFileDescriptor'
import { NativeWinNTFileSystem } from './NativeWinNTFileSystem'

export const getNativeJavaIOClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'FileDescriptor': return new NativeFileDescriptor()
		case 'WinNTFileSystem': return new NativeWinNTFileSystem()
		default: throw Error(`Could not find native java/io/${name}`)
	}
}
