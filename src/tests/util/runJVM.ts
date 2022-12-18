import { JVM } from '../../jvm/JVM'

export const runJVM = (paths: string[]): void => {
	JVM.suppressLogging()
	// eslint-disable-next-line no-new
	new JVM(paths)
}
