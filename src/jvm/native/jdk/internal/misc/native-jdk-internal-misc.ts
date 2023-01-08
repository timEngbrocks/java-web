import type { NativeClassObject } from '../../../NativeClassObject'
import { NativeCDS } from './NativeCDS'
import { NativeScopedMemoryAccess } from './NativeScopedMemoryAccess'
import { NativeSignal } from './NativeSignal'
import { NativeUnsafe } from './NativeUnsafe'
import { NativeVM } from './NativeVM'

export const getNativeJdkInternalMiscClassByName = (name: string): NativeClassObject => {
	switch (name) {
		case 'CDS': return new NativeCDS()
		case 'Unsafe': return new NativeUnsafe()
		case 'VM': return new NativeVM()
		case 'ScopedMemoryAccess': return new NativeScopedMemoryAccess()
		case 'Signal': return new NativeSignal()
		default: throw Error(`Could not find native jdk/internal/misc/${name}`)
	}
}
