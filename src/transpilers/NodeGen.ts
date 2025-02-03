import { arrayInsert, enumFromString } from "../helpers/helpers"
import { useCodeStore } from "../renderer/store/CodeStore"
import { Variable } from "../renderer/types/variable"
import { CodeLanguage } from "./CodeLanguage"
import { Edge, Node, ReactFlowInstance } from 'reactflow'
import { NodeTokenKind } from "./Token"
import { v4 as uuid } from 'uuid'
import { getRandomInt } from "../renderer/utils/random"

export class NodeGen {
    static activeLanguage: CodeLanguage
    static getActiveLang() {
        this.activeLanguage = enumFromString(
            CodeLanguage,
            useCodeStore.getState().activeLanguage,
        )!
    }
    static genInput(variable: Variable, nodeIndex: number, rfInstance: ReactFlowInstance) {
        console.log(
            `input node generation in with variable: ${variable.name}: ${variable.value}`,
        )
        // creating node
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
                label: variable,
                value: variable,
            },
        }
        newNode.data.id = newNode.id
        // inserting node
        console.log(rfInstance.getNodes())
        rfInstance.setNodes(nds => arrayInsert(nds, nodeIndex, newNode))
        requestAnimationFrame(() => {
            console.log(rfInstance.getNodes())
            // @TODO: get neighbour nodes to create edges
            // creating edge
            let newEdgeSource = `_start`
            let newEdgeTarget = `_end`
            let newEdgeId = `reactflow__edge-${newEdgeSource}-${newEdgeTarget}`
            let newEdge: Edge = {
                id: newEdgeId,
                source: '_start',
                sourceHandle: null,
                target: newNode.id,
                targetHandle: null
            }
            // inserting edge
            rfInstance.setEdges(edges => [newEdge])
        })

    }
}
