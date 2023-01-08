import type { ClassInstance } from '../class/ClassInstance'
import type { InterfaceObject } from '../class/InterfaceObject'
import type { ArrayType } from '../data-types/ArrayType'
import type { PrimitiveType } from '../data-types/PrimitiveType'

export type HeapData = ClassInstance | string | InterfaceObject | ArrayType | PrimitiveType
