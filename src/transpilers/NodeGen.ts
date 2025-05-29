import { arrayInsert, enumFromString } from '../helpers/helpers'
import { useCodeStore } from '../renderer/store/CodeStore'
import { Variable } from '../renderer/types/variable'
import { CodeLanguage } from './CodeLanguage'
import { Edge, Node, ReactFlowActions, ReactFlowInstance } from 'reactflow'
import { NodeTokenKind } from './Token'
import { v4 as uuid } from 'uuid'
import { getRandomInt } from '../renderer/utils/random'
import { initialNodes } from '../renderer/components/nodes/initialNodes'
import { ErrorReporter } from '../renderer/errors/ErrorReporter'
import { getNextNodeYPositionFromNodes } from '../renderer/utils/nodeUtils'
import { NodeCreationData } from '../renderer/types/nodeCreationData'

type IndexedNode = {
  node: Node
  index: number
}

export class NodeGen {
  static indexedNodes: IndexedNode[] = []
  static activeLanguage: CodeLanguage

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
      { node: initialNodes[1], index: sortedNodes.length + 1 },
    ]
    console.log(result)
    return result.map((indexedNode) => indexedNode.node)
  }

  static genNode(
    nodeCreationData: NodeCreationData,
    nodeIndex: number,
    rfInstance: ReactFlowInstance,
  ) {
    console.log(
      `${nodeCreationData.type} node generation in with variable: ${nodeCreationData.variable.value}`,
    )

    let nodes: Node[] = rfInstance.getNodes()

    // creating node
    // debugger;
    console.log(rfInstance.getNodes())
    let node: Node = {
      id: `_${nodeCreationData.type}_${uuid()}`,
      type: nodeCreationData.type,
      position: {
        x: nodes[0].position.x,
        y: getNextNodeYPositionFromNodes(rfInstance.getNodes()),
      },
      data: {
        id: null,
        label: nodeCreationData.variable,
        value: nodeCreationData.variable,
      },
    }
    node.data.id = node.id

    this.insertNode(node, nodeIndex, rfInstance)

    // debugger;
    console.log(rfInstance.getNodes())
  }

  static insertNode(
    node: Node,
    nodeIndex: number,
    rfInstance: ReactFlowInstance,
  ) {
    // debugger
    // let nodes: Node[] = rfInstance.getNodes()

    let indexedNode: IndexedNode = { node, index: nodeIndex }
    console.log('indexedNode')
    console.log(indexedNode)
    this.indexedNodes.push(indexedNode)
    console.log('allIndexedNodes')
    console.log(this.indexedNodes)
    // inserting node
    let nodes = this.getNodesSorted()
    console.log(nodes)
    console.log(rfInstance)
    rfInstance.addNodes(nodes)
    requestAnimationFrame(() => {
      console.log('nodes from sorted nodes')
      console.log(nodes)
      let prevNode = nodes[nodeIndex - 1]
      let nextNode = nodes[nodeIndex + 1]
      const edges = []
      const conditionalTypes = ['_if_cond', '_for_lp', '_while_lp']
      for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({
          id: `e${nodes[i].id}-${nodes[i + 1].id}`,
          source: nodes[i].id,
          sourceHandle: conditionalTypes.includes([i + 1].type) && 'h_true', // @TODO: use condiotions from CST
          target: nodes[i + 1].id,
          targetHandle: conditionalTypes.includes([i + 1].type) && 'h_true', // @TODO: use condiotions from CST
        })
      }
      rfInstance.setEdges(edges)
    })
  }

  static clearIndexedNodes() {
    this.indexedNodes = []
  }

  // block end will remain as a separate function for now
  // because of some extra logic required

  static genBlockEnd(nodeIndex: number, rfInstance: ReactFlowInstance) {
    console.log(`block end node generation at position: ${nodeIndex}`)
    console.log('nodeIndex')
    console.log(nodeIndex)
    console.log('this.indexedNodes')
    console.log(this.indexedNodes)
    // block nodes list; code repetition?
    const blockOpenerTypes: NodeTokenKind[] = [
      NodeTokenKind.NTK_IF_CONDITION,
      NodeTokenKind.NTK_FOR_LOOP,
      NodeTokenKind.NTK_WHILE_LOOP,
    ]
    const blockCloserTypes: NodeTokenKind[] = [
      NodeTokenKind.NTK_IF_CONDITION_END,
      NodeTokenKind.NTK_FOR_LOOP_END,
      NodeTokenKind.NTK_WHILE_LOOP_END,
    ]
    let prevNodes = this.indexedNodes.slice(0, nodeIndex)
    let opener = prevNodes.find((n) => blockOpenerTypes.includes(n.node.type)) // closest block node
    console.log('opener')
    console.log(opener)
    if (!opener) {
      // "unmatched block end" error
      ErrorReporter.showUnbalancedNodeBlock(
        'start',
        NodeTokenKind.NTK_BLOCK_END,
        nodeIndex,
      )
      // doubt that i need to report node error as code error but i am insane
      useCodeStore.getState().setCodeError({
        message: `unmatched block end at position ${nodeIndex}`,
        line: nodeIndex,
        col: 0,
      })
      return
    }

    let blockEndType =
      blockCloserTypes[blockOpenerTypes.indexOf(opener.node.type)] // getting type of corresponding block end

    let nodes: Node[] = rfInstance.getNodes()
    // creating node
    let node: Node = {
      // define the type by getting closest opener
      id: `_${blockEndType}_${uuid()}`,
      type: blockEndType,
      position: {
        x: nodes[0].position.x,
        y: getNextNodeYPositionFromNodes(nodes),
      },
      data: {
        id: null,
        // unused on block end, because it have constant value

        // label: variable,
        // value: variable,
      },
    }
    node.data.id = node.id

    this.insertNode(node, nodeIndex, rfInstance)
  }
}
