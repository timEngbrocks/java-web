import { JVM } from '../../jvm/JVM'

export const runJVM = (paths: string[]): void => {
	// eslint-disable-next-line no-new
	new JVM(paths)
}
