import { readFileSync } from 'fs'
import { get } from 'lodash'
import { ClassObjectManager } from '../../../../interpreter/class/ClassObjectManager'
import { byte } from '../../../../interpreter/data-types/byte'
import { ArrayType, ReferenceType } from '../../../../interpreter/data-types/data-type'
import { Runtime } from '../../../../interpreter/Runtime'
import { ExecutionContext } from '../../../../interpreter/util/ExecutionContext'
import { MethodObject } from '../../../../interpreter/util/MethodObject'
import { NativeClassObject } from '../../../NativeClassObject'

export class NativeSystemProps$Raw extends NativeClassObject {
	public executeMethod(method: MethodObject, executionContext: ExecutionContext): void {
		switch (method.name) {
			case 'platformProperties': return this.nativePlatformProperties(executionContext)
			case 'vmProperties': return this.nativeVmProperties(executionContext)
			default: throw new Error(`Could not find native method ${method.name} on ${this.toString()}`)
		}
	}

	private nativePlatformProperties(executionContext: ExecutionContext): void {
		const platformPropsIndices = {
			_display_country_NDX: 0,
			_display_language_NDX: 1,
			_display_script_NDX: 2,
			_display_variant_NDX: 3,
			_file_encoding_NDX: 4,
			_file_separator_NDX: 5,
			_format_country_NDX: 6,
			_format_language_NDX: 7,
			_format_script_NDX: 8,
			_format_variant_NDX: 9,
			_ftp_nonProxyHosts_NDX: 10,
			_ftp_proxyHost_NDX: 11,
			_ftp_proxyPort_NDX: 12,
			_http_nonProxyHosts_NDX: 13,
			_http_proxyHost_NDX: 14,
			_http_proxyPort_NDX: 15,
			_https_proxyHost_NDX: 16,
			_https_proxyPort_NDX: 17,
			_java_io_tmpdir_NDX: 18,
			_line_separator_NDX: 19,
			_os_arch_NDX: 20,
			_os_name_NDX: 21,
			_os_version_NDX: 22,
			_path_separator_NDX: 23,
			_socksNonProxyHosts_NDX: 24,
			_socksProxyHost_NDX: 25,
			_socksProxyPort_NDX: 26,
			_stderr_encoding_NDX: 27,
			_stdout_encoding_NDX: 28,
			_sun_arch_abi_NDX: 29,
			_sun_arch_data_model_NDX: 30,
			_sun_cpu_endian_NDX: 31,
			_sun_cpu_isalist_NDX: 32,
			_sun_io_unicode_encoding_NDX: 33,
			_sun_jnu_encoding_NDX: 34,
			_sun_os_patch_level_NDX: 35,
			_user_dir_NDX: 36,
			_user_home_NDX: 37,
			_user_name_NDX: 38
		}
		const FIXED_LENGTH = Object.keys(platformPropsIndices).length

		const platformPropsConfig = JSON.parse(readFileSync('src/jvm/config/platform-properties.json').toString())

		const platformProps = new Array<string>(FIXED_LENGTH)
		for (const [key, index] of Object.entries(platformPropsIndices)) {
			platformProps[index] = get(platformPropsConfig, key)
		}

		const references = []
		for (const prop of platformProps) {
			references.push(this.constructStringClass(prop))
		}
		const stringArray = new ArrayType(new ReferenceType({ address: null, name: 'platformProps' }), FIXED_LENGTH)
		stringArray.set(references)
		executionContext.operandStack.push(Runtime.it().allocate(stringArray))
	}

	private nativeVmProperties(executionContext: ExecutionContext): void {
		const vmPropsConfig = JSON.parse(readFileSync('src/jvm/config/vm-properties.json').toString())
		const references = []
		for (const [key, value] of Object.entries(vmPropsConfig)) {
			references.push(this.constructStringClass(key))
			references.push(this.constructStringClass(value as string))
		}
		references.push(new ReferenceType({ address: null, name: 'vmPropsKey' }))
		references.push(new ReferenceType({ address: null, name: 'vmPropsValue' }))
		const stringArray = new ArrayType(new ReferenceType({ address: null, name: 'vmProps' }), references.length)
		stringArray.set(references)
		executionContext.operandStack.push(Runtime.it().allocate(stringArray))
	}

	public toString(): string {
		return 'native jdk/internal/util/SystemProps$Raw'
	}

	private constructStringClass(text: string): ReferenceType {
		// FIXME: this probably shouldn't use \0
		const stringClass = ClassObjectManager.newInstance('java/lang/String')
		if (!stringClass) throw new Error('ldc could not find java/lang/String')
		const stringValue = new ArrayType(new byte())
		for (let i = 0; i < text.length; i++) {
			stringValue.get().push(Runtime.it().allocate(new byte(text.charCodeAt(i))))
		}
		stringClass.putField('value', Runtime.it().allocate(stringValue))
		return Runtime.it().allocate(stringClass)
	}
}
