import type { NativeClassObject } from '../../../NativeClassObject'
import { NativeDirectConstructorHandleAccessor$NativeAccessor } from './NativeDirectConstructorHandleAccessor$NativeAccessor'
import { NativeReflection } from './NativeReflection'

export const getNativeJdkInternalReflectClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'Reflection': return new NativeReflection()
		case 'DirectConstructorHandleAccessor$NativeAccessor': return new NativeDirectConstructorHandleAccessor$NativeAccessor()
		default: throw Error(`Could not find native jdk/internal/reflect/${name}`)
	}
}
