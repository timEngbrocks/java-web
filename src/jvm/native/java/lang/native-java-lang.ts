import { NativeClassObject } from '../../NativeClassObject'
import { NativeClass } from './NativeClass'
import { NativeObject } from './NativeObject'
import { NativeRuntime } from './NativeRuntime'
import { NativeSystem } from './NativeSystem'
import { NativeThread } from './NativeThread'

export const getNativeJavaLangClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'Object': return new NativeObject()
		case 'System': return new NativeSystem()
		case 'Thread': return new NativeThread()
		case 'Class': return new NativeClass()
		case 'Runtime': return new NativeRuntime()
		default: throw Error(`Could not find native java/lang/${name}`)
	}
}
