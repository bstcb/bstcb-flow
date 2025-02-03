export function enumFromString<T>(
    enumType: T,
    enumValue: string,
): T[keyof T] | undefined {
    // @ts-ignore
    const keys = Object.keys(enumType).filter(
        x => enumType[x as keyof T] === enumValue,
    )
    return keys.length > 0 ? enumType[keys[0] as keyof T] : undefined
}

export function arrayInsert(array: any[], index: number, newItem: any): any[] {
    if (index < 0 || index > array.length)
        throw new Error("`arrayInsert()` error: index out of bounds")

    return [
        ...array.slice(0, index),
        newItem,
        ...array.slice(index)
    ];
}
