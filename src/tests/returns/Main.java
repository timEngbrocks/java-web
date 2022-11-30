public class Main {
	public static void main(String[] args) {
		int a = Main.getInt();
		long b = Main.getLong();
		float c = Main.getFloat();
		double d = Main.getDouble();
		Main e = Main.getMain();
	}
	public static int getInt() {
		return 1;
	}
	public static long getLong() {
		return 1l;
	}
	public static float getFloat() {
		return 1.0f;
	}
	public static double getDouble() {
		return 1.0d;
	}
	public static Main getMain() {
		return new Main();
	}
}