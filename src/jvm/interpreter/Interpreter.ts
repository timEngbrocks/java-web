import { ClassFile } from "../class-loader/parser/types/ClassFile"
import { ClassObject } from "./ClassObject"
import { Runtime } from "./Runtime"

export class Interpreter {
    private classes: ClassObject[] = []
    private activeClassIndex: number = -1

    constructor(classFiles: ClassFile[]) {
        for (const classFile of classFiles) {
            const classObject = new ClassObject()
            classObject.initialize(classFile)
            this.classes.push(classObject)
        }

        for (let i = 0; i < this.classes.length; i++) {
            for (const instructionStream of this.classes[i].instructionStreams) {
                if (instructionStream.getName() === 'main') {
                    this.activeClassIndex = i
                    Runtime.set(this.classes[i], this.classes)
                }
            }
        }
        if (this.activeClassIndex < 0) throw 'Could not find main method'
    }

    public execute(): void {
        console.log()
        console.log('--------executing------------')
        console.log()

        const activeClass = this.classes[this.activeClassIndex]

        while (activeClass.activeInstructionStream.hasNext()) {
            const instruction = activeClass.activeInstructionStream.next()

            console.log(instruction.toString())
            instruction.execute()

        }

        console.log()
        console.log('--------state after execution------------')
        console.log()
        console.log(activeClass.activeFrame.operandStack.getStackOverview())
        console.log(activeClass.activeFrame.getLocalVariablesOverview())

    }
}