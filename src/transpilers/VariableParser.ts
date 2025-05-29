import { Variable } from '../renderer/types/variable'
import { NodeTokenKind } from './Token'

export abstract class VariableParser {
  static parse(value: string, kind: NodeTokenKind): Variable {
    // @TODO: fix this workaround. Sometimes value comes as object
    if (typeof value === 'string') {
      switch (kind) {
        // @TODO: handle potential wrong input type error
        case NodeTokenKind.NTK_IF_CONDITION:
          return {
            name: value,
            value: value,
          }
        case NodeTokenKind.NTK_FOR_LOOP:
          return {
            name: value,
            value: value,
          }
        case NodeTokenKind.NTK_WHILE_LOOP:
          return {
            name: value,
            value: value,
          }
        case NodeTokenKind.NTK_INPUT:
          return {
            name: value.split('=')[0].trim(),
            value: value.split('=')[1].trim(),
          }
        case NodeTokenKind.NTK_OUTPUT:
          return {
            name: value,
            value: value,
          }
        case NodeTokenKind.NTK_INITIAL:
          return {} as Variable
      }
    } else {
      return value
    }
  }
}
