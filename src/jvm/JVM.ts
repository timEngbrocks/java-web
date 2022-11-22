import { ClassLoader } from "./class-loader/ClassLoader"
import { Interpreter } from "./interpreter/Interpreter"

export class JVM {
    private interpreter: Interpreter

    constructor(paths: string[]) {
        const classes = []
        for (const path of paths) {
            const classLoader = new ClassLoader(path)
            classes.push(classLoader.getClass())
        }
        this.interpreter = new Interpreter(classes)
        this.interpreter.execute()
    }

}