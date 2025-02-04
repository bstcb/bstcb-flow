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
            let prevNode = rfInstance.getNodes()[nodeIndex - 1]
            let nextNode = rfInstance.getNodes()[nodeIndex + 1]
            // @TODO: get neighbour nodes to create edges
            // creating edge
            let sourceEdgeId = prevNode.id
            let targetEdgeId = nextNode.id
            let sourceEdge: Edge = {
                id: `reactflow__edge-${sourceEdgeId}-${newNode.id}`,
                source: sourceEdgeId,
                sourceHandle: null,
                target: newNode.id,
                targetHandle: null
            }
            let targetEdge: Edge = {
                id: `reactflow__edge-${newNode.id}-${targetEdgeId}`,
                source: newNode.id,
                sourceHandle: null,
                target: targetEdgeId,
                targetHandle: null
            }
            // inserting edge
            rfInstance.setEdges(edges => edges.concat([sourceEdge, targetEdge]))
        })

    }
    static genOutput(variable: Variable, nodeIndex: number, rfInstance: ReactFlowInstance) {
        console.log(
            `output node generation in with variable: ${variable.value}`,
        )
        // creating node
        let newNode: Node = {
            id: `_${NodeTokenKind.NTK_OUTPUT}_${uuid()}`,
            type: NodeTokenKind.NTK_OUTPUT,
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
            let prevNode = rfInstance.getNodes()[nodeIndex - 1]
            let nextNode = rfInstance.getNodes()[nodeIndex + 1]
            // @TODO: get neighbour nodes to create edges
            // creating edge
            let sourceEdgeId = prevNode.id
            let targetEdgeId = nextNode.id
            let sourceEdge: Edge = {
                id: `reactflow__edge-${sourceEdgeId}-${newNode.id}`,
                source: sourceEdgeId,
                sourceHandle: null,
                target: newNode.id,
                targetHandle: null
            }
            let targetEdge: Edge = {
                id: `reactflow__edge-${newNode.id}-${targetEdgeId}`,
                source: newNode.id,
                sourceHandle: null,
                target: targetEdgeId,
                targetHandle: null
            }
            // inserting edge
            rfInstance.setEdges(edges => edges.concat([sourceEdge, targetEdge]))
        })

    }
    static genIf(variable: Variable, nodeIndex: number, rfInstance: ReactFlowInstance) {
        console.log(
            `if condition node generation in with variable: ${variable.value}`,
        )
        // creating node
        let newNode: Node = {
            id: `_${NodeTokenKind.NTK_IF_CONDITION}_${uuid()}`,
            type: NodeTokenKind.NTK_IF_CONDITION,
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
            let prevNode = rfInstance.getNodes()[nodeIndex - 1]
            let nextNode = rfInstance.getNodes()[nodeIndex + 1]
            // @TODO: get neighbour nodes to create edges
            // creating edge
            let sourceEdgeId = prevNode.id
            let targetEdgeId = nextNode.id
            let sourceEdge: Edge = {
                id: `reactflow__edge-${sourceEdgeId}-${newNode.id}`,
                source: sourceEdgeId,
                sourceHandle: null,
                target: newNode.id,
                targetHandle: null
            }
            let targetEdge: Edge = {
                id: `reactflow__edge-${newNode.id}-${targetEdgeId}`,
                source: newNode.id,
                sourceHandle: 'h_true',
                target: targetEdgeId,
                targetHandle: null
            }
            // inserting edge
            rfInstance.setEdges(edges => edges.concat([sourceEdge, targetEdge]))
        })
    }
    static genFor(variable: Variable, nodeIndex: number, rfInstance: ReactFlowInstance) {
        console.log(
            `for loop node generation in with variable: ${variable.value}`,
        )
        // creating node
        let newNode: Node = {
            id: `_${NodeTokenKind.NTK_FOR_LOOP}_${uuid()}`,
            type: NodeTokenKind.NTK_FOR_LOOP,
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
            let prevNode = rfInstance.getNodes()[nodeIndex - 1]
            let nextNode = rfInstance.getNodes()[nodeIndex + 1]
            // @TODO: get neighbour nodes to create edges
            // creating edge
            let sourceEdgeId = prevNode.id
            let targetEdgeId = nextNode.id
            let sourceEdge: Edge = {
                id: `reactflow__edge-${sourceEdgeId}-${newNode.id}`,
                source: sourceEdgeId,
                sourceHandle: null,
                target: newNode.id,
                targetHandle: null
            }
            let targetEdge: Edge = {
                id: `reactflow__edge-${newNode.id}-${targetEdgeId}`,
                source: newNode.id,
                sourceHandle: 'h_true',
                target: targetEdgeId,
                targetHandle: null
            }
            // inserting edge
            rfInstance.setEdges(edges => edges.concat([sourceEdge, targetEdge]))
        })
    }
    static genWhile(variable: Variable, nodeIndex: number, rfInstance: ReactFlowInstance) {
        console.log(
            `while loop node generation in with variable: ${variable.value}`,
        )
        // creating node
        let newNode: Node = {
            id: `_${NodeTokenKind.NTK_IF_CONDITION}_${uuid()}`,
            type: NodeTokenKind.NTK_IF_CONDITION,
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
            let prevNode = rfInstance.getNodes()[nodeIndex - 1]
            let nextNode = rfInstance.getNodes()[nodeIndex + 1]
            // @TODO: get neighbour nodes to create edges
            // creating edge
            let sourceEdgeId = prevNode.id
            let targetEdgeId = nextNode.id
            let sourceEdge: Edge = {
                id: `reactflow__edge-${sourceEdgeId}-${newNode.id}`,
                source: sourceEdgeId,
                sourceHandle: null,
                target: newNode.id,
                targetHandle: null
            }
            let targetEdge: Edge = {
                id: `reactflow__edge-${newNode.id}-${targetEdgeId}`,
                source: newNode.id,
                sourceHandle: 'h_true',
                target: targetEdgeId,
                targetHandle: null
            }
            // inserting edge
            rfInstance.setEdges(edges => edges.concat([sourceEdge, targetEdge]))
        })
    }
}
