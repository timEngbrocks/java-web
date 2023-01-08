import { JVM } from '../../jvm/JVM'

export const runJVM = (paths: string[]): void => {
	JVM.suppressLogging()
	// eslint-disable-next-line no-new
	const jvm = JVM.construct()
	jvm.runClasses(paths)
}
