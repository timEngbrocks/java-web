import type { NativeClassObject } from '../../NativeClassObject'
import { getNativeJavaLangInvokeClassByName } from './invoke/native-java-lang-invoke'
import { NativeClass } from './NativeClass'
import { NativeClassLoader } from './NativeClassLoader'
import { NativeDouble } from './NativeDouble'
import { NativeFloat } from './NativeFloat'
import { NativeObject } from './NativeObject'
import { NativeRuntime } from './NativeRuntime'
import { NativeSystem } from './NativeSystem'
import { NativeThread } from './NativeThread'
import { NativeThrowable } from './NativeThrowable'
import { getNativeJavaLangRefClassByName } from './ref/native-java-lang-ref'

export const getNativeJavaLangClassByName = (name: string): NativeClassObject => {
	const packageName = name.substring(0, name.indexOf('/'))
	const subName = name.substring(name.indexOf('/') + 1)
	switch (packageName) {
		case 'ref': return getNativeJavaLangRefClassByName(subName)
		case 'invoke': return getNativeJavaLangInvokeClassByName(subName)
	}
	switch (subName) {
		case 'Object': return new NativeObject()
		case 'System': return new NativeSystem()
		case 'Thread': return new NativeThread()
		case 'Class': return new NativeClass()
		case 'Runtime': return new NativeRuntime()
		case 'Float': return new NativeFloat()
		case 'Double': return new NativeDouble()
		case 'ClassLoader': return new NativeClassLoader()
		case 'Throwable': return new NativeThrowable()
		default: throw Error(`Could not find native java/lang/${name}`)
	}
}
