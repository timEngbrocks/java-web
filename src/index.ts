import { JVM } from './jvm/JVM'

const jvm = JVM.construct()
jvm.runClasses(['Main.class'])
