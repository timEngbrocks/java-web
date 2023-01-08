import type { NativeClassObject } from '../../../NativeClassObject'
import { NativeSystemProps$Raw } from './NativeSystemProps$Raw'

export const getNativeJdkInternalUtilClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'SystemProps$Raw': return new NativeSystemProps$Raw()
		default: throw Error(`Could not find native jdk/internal/util/${name}`)
	}
}
