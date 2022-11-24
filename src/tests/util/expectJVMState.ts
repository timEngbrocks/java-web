import { ClassObject } from "../../jvm/interpreter/ClassObject"
import { array } from "../../jvm/interpreter/data-types/array"
import { DataType } from "../../jvm/interpreter/data-types/data-type"
import { InterfaceObject } from "../../jvm/interpreter/InterfaceObject"
import { LocalVariable } from "../../jvm/interpreter/memory/local-variable"

export interface JVMState {
    localVariables: LocalVariable[] | undefined
    stack: DataType<any>[] | undefined
    classHeap: Map<number, ClassObject> | undefined
    interfaceHeap: Map<number, InterfaceObject> | undefined
    arrayHeap: Map<number, array<any>> | undefined
}

export const expectJVMState = (classObject: ClassObject, state: JVMState) => {
    if (state.localVariables) {
        const localVariables = classObject.currentMethod.activeFrame.localVariables
        expect(state.localVariables.length + 1).toEqual(localVariables.length)
        for (let i = 1; i < state.localVariables.length; i++) {
            expect(state.localVariables[i]).toEqual(localVariables[i])
        }
    }

    if (state.stack) {
        const stack = classObject.currentMethod.activeFrame.operandStack.stack
        expect(state.stack.length).toEqual(stack.length)
        for (let i = 0; i < state.stack.length; i++) {
            expect(state.stack[i]).toEqual(stack[i])
        }
    }

    if (state.classHeap) {
        classObject.heap.classHeap.forEach((value, key) => {
            if (key === 0) return
            expect(state.classHeap?.has(key)).toBeTruthy()
            expect(state.classHeap?.get(key)).toEqual(value)
        })
    }

    if (state.interfaceHeap) {
        classObject.heap.interfaceHeap.forEach((value, key) => {
            expect(state.interfaceHeap?.has(key)).toBeTruthy()
            expect(state.interfaceHeap?.get(key)).toEqual(value)
        })
    }

    if (state.arrayHeap) {
        classObject.heap.arrayHeap.forEach((value, key) => {
            expect(state.arrayHeap?.has(key)).toBeTruthy()
            expect(state.arrayHeap?.get(key)).toEqual(value)
        })
    }
}