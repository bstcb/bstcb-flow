import { arrayInsert, enumFromString } from "../helpers/helpers"
import { useCodeStore } from "../renderer/store/CodeStore"
import { Variable } from "../renderer/types/variable"
import { CodeLanguage } from "./CodeLanguage"
import { Edge, Node, ReactFlowActions, ReactFlowInstance } from 'reactflow'
import { NodeTokenKind } from "./Token"
import { v4 as uuid } from 'uuid'
import { getRandomInt } from "../renderer/utils/random"
import { initialNodes } from "../renderer/components/nodes/initialNodes"

type IndexedNode = {
    node: Node,
    index: number
}

export class NodeGen {
    static indexedNodes: IndexedNode[] = []
    static activeLanguage: CodeLanguage
    static positionOffset: number = 30
    static getActiveLang() {
        this.activeLanguage = enumFromString(
            CodeLanguage,
            useCodeStore.getState().activeLanguage,
        )!
    }
    private static getNodesSorted(): Node[] {
        let sortedNodes = this.indexedNodes.sort((a, b) => a.index - b.index)

        let result: IndexedNode[] = [
            { node: initialNodes[0], index: 0 },
            ...sortedNodes,
            { node: initialNodes[1], index: sortedNodes.length },
        ]
        console.log(result)
        return result.map(indexedNode => indexedNode.node)
    }
    private static genNode(node: Node, nodeIndex: number, rfInstance: ReactFlowInstance) {
        // @TODO: handle node positions
        node.position.y += this.positionOffset * nodeIndex
        // debugger
        let newIndexedNode: IndexedNode = { node, nodeIndex }
        console.log('newIndexedNode')
        console.log(newIndexedNode)
        this.indexedNodes.push(newIndexedNode)
        // inserting node
        console.log(rfInstance.getNodes())
        let nodes = this.getNodesSorted()
        rfInstance.setNodes(nodes)
        requestAnimationFrame(() => {
            console.log('nodes from sorted nodes')
            console.log(rfInstance.getNodes())
            let prevNode = rfInstance.getNodes()[nodeIndex - 1]
            let nextNode = rfInstance.getNodes()[nodeIndex + 1]
            const edges = [];
            const conditionalTypes = ['_if_cond', '_for_lp', '_while_lp']
            for (let i = 0; i < nodes.length - 1; i++) {
                edges.push({
                    id: `e${nodes[i].id}-${nodes[i + 1].id}`,
                    source: nodes[i].id,
                    sourceHandle: conditionalTypes.includes([i + 1].type) && 'h_true', // @TODO: use condiotions from CST
                    target: nodes[i + 1].id,
                    targetHandle: conditionalTypes.includes([i + 1].type) && 'h_true', // @TODO: use condiotions from CST
                });
            }
            rfInstance.setEdges(edges)
        })


    }
    static clearIndexedNodes() {
        this.indexedNodes = []
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

        this.genNode(newNode, nodeIndex, rfInstance)
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

        this.genNode(newNode, nodeIndex, rfInstance)
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

        this.genNode(newNode, nodeIndex, rfInstance)
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

        this.genNode(newNode, nodeIndex, rfInstance)
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

        this.genNode(newNode, nodeIndex, rfInstance)
    }
}
