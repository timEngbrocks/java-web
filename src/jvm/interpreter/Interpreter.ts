import { ClassFile } from "../class-loader/parser/types/ClassFile"
import { ClassObject } from "./ClassObject"
import { Runtime } from "./Runtime"

export class Interpreter {
    constructor(classFiles: ClassFile[] = []) {
        const classes = []
        for (const classFile of classFiles) {
            const classObject = new ClassObject()
            classObject.initialize(classFile)
            classes.push(classObject)
        }

        for (let i = 0; i < classes.length; i++) {
            if (classes[i].hasMainMethod) {
                Runtime.set(classes[i], classes)
            }
        }
    }

    public execute(): void {
        while (Runtime.classObject.currentMethod.activeInstructionStream.hasNext()) {
            const instruction = Runtime.classObject.currentMethod.activeInstructionStream.next()
            instruction.execute()
        }
    }
}