import { ClassObject, MethodContext } from "../../jvm/interpreter/ClassObject";
import { reference } from "../../jvm/interpreter/data-types/references";
import { LocalVariable } from "../../jvm/interpreter/memory/local-variable";

export const createSimpleClass = (name: string, methods: MethodContext[]): ClassObject => {
    const classObject = new ClassObject()
    classObject.hasMainMethod = true
    classObject.name = name
    classObject.methods = methods
    classObject.callFunction('main')
    const thisAddress = classObject.allocate(classObject)
    const thisReference = new reference()
    thisReference.set(thisAddress)
    const thisLocal = new LocalVariable(thisReference)
    classObject.currentMethod.activeFrame.setLocalVariable(thisLocal, 0)
    return classObject
}