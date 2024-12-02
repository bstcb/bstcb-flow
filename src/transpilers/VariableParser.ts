import { Variable } from '../renderer/types/variable'

export abstract class VariableParser {
	static parse(v: string | Variable): Variable {
		if (typeof v === 'string')
			return {
				name: v.split('=')[0].trim(),
				value: v.split('=')[1].trim(),
			}
		return v
	}
}
