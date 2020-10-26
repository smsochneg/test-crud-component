export type IItemChangeFunction<T> = (key: keyof T, value: T[keyof T]) => void;;
