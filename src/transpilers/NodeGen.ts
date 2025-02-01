import { enumFromString } from "../helpers/helpers"
import { useCodeStore } from "../renderer/store/CodeStore"
import { Variable } from "../renderer/types/variable"
import { CodeLanguage } from "./CodeLanguage"
import { Node, ReactFlowInstance } from 'reactflow'
import { NodeTokenKind } from "./Token"

export class NodeGen {
  static activeLanguage: CodeLanguage
  static getActiveLang() {
    this.activeLanguage = enumFromString(
      CodeLanguage,
      useCodeStore.getState().activeLanguage,
    )!
  }
  static genInput(variable: Variable, rfInstance: ReactFlowInstance) {
    console.log(
      `input node generation in with variable: ${variable.name}: ${variable.value}`,
    )
    let newNode: Node = {
      id: `_${NodeTokenKind.NTK_INPUT}_${uuid()}`,
      type: NodeTokenKind.NTK_INPUT,
      position: {
        // @TODO: count position relative to neighbour nodes 
        x: getRandomInt(100, 150),
        y: getRandomInt(100, 300),
      },
      data: {
        id: null,
        label: variable.name,
        value: variable.value,
      },
    }
    newNode.data.id = newNode.id

    rfInstance.setNodes(nds => nds.concat(newNode))
  }
}
