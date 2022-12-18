class PrintPlatformProperties {
	public static void main(String[] args) {
		print("_display_country_NDX", "user.country");
		print("_display_language_NDX", "user.language");
		print("_display_script_NDX", "user.script");
		print("_display_variant_NDX", "user.variant");
		print("_file_encoding_NDX", "file.encoding");
		print("_file_separator_NDX", "file.seperator");
		print("_format_country_NDX", "user.country");
		print("_format_language_NDX", "user.language");
		print("_format_script_NDX", "user.script");
		print("_format_variant_NDX", "user.variant");
		print("_ftp_nonProxyHosts_NDX", "ftp.nonProxyHosts");
		print("_ftp_proxyHost_NDX", "ftp.proxyHost");
		print("_ftp_proxyPort_NDX", "ftp.proxyPort");
		print("_http_nonProxyHosts_NDX", "http.nonProxyHosts");
		print("_http_proxyHost_NDX", "http.proxyHost");
		print("_http_proxyPort_NDX", "http.proxyPort");
		print("_https_proxyHost_NDX", "https.proxyHost");
		print("_https_proxyPort_NDX", "https.proxyPort");
		print("_java_io_tmpdir_NDX", "java.io.tmpdir");
		print("_line_separator_NDX", "line.separator");
		print("_os_arch_NDX", "os.arch");
		print("_os_name_NDX", "os.name");
		print("_os_version_NDX", "os.version");
		print("_path_separator_NDX", "path.seperator");
		print("_socksNonProxyHosts_NDX", "socksNonProxyHosts");
		print("_socksProxyHost_NDX", "socksProxyHost");
		print("_socksProxyPort_NDX", "socksProxyPort");
		print("_stderr_encoding_NDX", "stderr.encoding");
		print("_stdout_encoding_NDX", "stdout.encoding");
		print("_sun_arch_abi_NDX", "sun.arch.abi");
		print("_sun_arch_data_model_NDX", "sun.arch.data.model");
		print("_sun_cpu_endian_NDX", "sun.cpu.endian");
		print("_sun_cpu_isalist_NDX", "sun.cpu.isalist");
		print("_sun_io_unicode_encoding_NDX", "sun.io.unicode.encoding");
		print("_sun_jnu_encoding_NDX", "sun.jnu.encoding");
		print("_sun_os_patch_level_NDX", "sun.os.patch.level");
		print("_user_dir_NDX", "user.dir");
		print("_user_home_NDX", "user.home");
		print("_user_name_NDX", "user.name");
	}
	public static void print(String jdkId, String id) {
		System.out.println(jdkId + ": '" +System.getProperty(id) + "',");
	}
}