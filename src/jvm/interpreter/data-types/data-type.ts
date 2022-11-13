export abstract class DataType<T> {
    public abstract isWide: boolean
    public abstract get(): T
    public abstract set(value: T): void
}