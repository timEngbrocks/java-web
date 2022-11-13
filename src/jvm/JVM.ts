import { ClassLoader } from "./class-loader/ClassLoader"
import { Interpreter } from "./interpreter/Interpreter"

export class JVM {

    private classLoader: ClassLoader
    private interpreter: Interpreter

    constructor(path: string) {
        this.classLoader = new ClassLoader(path)
        this.interpreter = new Interpreter(this.classLoader.getClass())
        this.interpreter.execute()
    }

}