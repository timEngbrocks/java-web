class PrintVMProperties {
	public static void main(String[] args) {
		print("java.vm.specification.name");
		print("java.vm.version");
		print("java.vm.name");
		print("jdk.debug");
		print("java.vm.info");
		print("sun.boot.library.path");
		print("java.library.path");
		print("java.home");
		print("java.class.path");
		print("jdk.boot.class.path.append");
		print("java.vm.specification.vendor");
		print("java.vm.specification.version");
		print("java.vm.vendor");
		print("sun.nio.MaxDirectMemorySize");
		print("sun.management.compiler");
		print("sun.nio.PageAlignDirectMemory");
		print("java.class.version");
	}
	public static void print(String id) {
		System.out.println("\"" + id + "\": \"" +System.getProperty(id) + "\",");
	}
}