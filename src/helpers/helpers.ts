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
