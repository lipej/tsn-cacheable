export interface Repository<T = unknown> {
    get: (key: string) => Promise<T>
    set: (key: string, value: T) => Promise<void>
}