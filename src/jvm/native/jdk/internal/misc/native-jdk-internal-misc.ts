import { NativeClassObject } from '../../../NativeClassObject'
import { NativeCDS } from './NativeCDS'
import { NativeUnsafe } from './NativeUnsafe'
import { NativeVM } from './NativeVM'

export const getNativeJdkInternalMiscClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'CDS': return new NativeCDS()
		case 'Unsafe': return new NativeUnsafe()
		case 'VM': return new NativeVM()
		default: throw Error(`Could not find native jdk/internal/misc/${name}`)
	}
}
