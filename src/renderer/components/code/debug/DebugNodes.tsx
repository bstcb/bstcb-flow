import { Node, Edge, getConnectedEdges, useReactFlow } from 'reactflow'
import { useCodeStore } from '../../../store/CodeStore'
import { NodeTranspiler } from '../../../../transpilers/NodeTranspiler'
import { ErrorReporter } from '../../../errors/ErrorReporter'
import { NodeTokenKind } from '../../../../transpilers/Token'
import { NODE_ERROR_CLASSNAME } from '../../../constants'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../../i18config'

const DebugNodes = () => {
  const { getNodes, getEdges, getNode } = useReactFlow()
  const { t } = useTranslation()
  const getActiveNodes = (connectedEdges: Edge[]) => {
    let startEdge = connectedEdges.find((e) => e.source === '_start')
    let endEdge = connectedEdges.find((e) => e.target === '_end')

    if (!startEdge || !endEdge) {
      // @TODO: clarify the error
      ErrorReporter.showShort(i18n.t('FLOWCHART_EMPTY_ERROR'))
      return []
    }

    let activeNodes: Node[] = []

    for (let i = 0; i < connectedEdges.length; i++) {
      let edge = connectedEdges[i]
      if (getNode(edge.target))
        if (edge.target !== '_end')
          // omitting the initials, because they are not doing anything anyway
          activeNodes.push(getNode(edge.target)!)
    }
    // debugger
    return activeNodes
  }
  const tryParseNodes = () => {
    console.log('trying to parse nodes')

    let currentNodes = getNodes()
    let currentEdges = getEdges()

    // actual connected nodes that need to be transpiled
    let connectedEdges: Edge[] = getConnectedEdges(currentNodes, currentEdges)
    console.log('[DEBUG]: connected edges are:')
    console.log(connectedEdges)

    let activeNodes: Node[] = getActiveNodes(connectedEdges)

    console.log('[DEBUG]: active nodes are:')
    console.log(activeNodes)

    // validate blocks
    let blockTypePairs = {
      [NodeTokenKind.NTK_IF_CONDITION]: NodeTokenKind.NTK_IF_CONDITION_END,
      [NodeTokenKind.NTK_FOR_LOOP]: NodeTokenKind.NTK_FOR_LOOP_END,
      [NodeTokenKind.NTK_WHILE_LOOP]: NodeTokenKind.NTK_WHILE_LOOP_END,
    }

    let blockStartTypes = Object.keys(blockTypePairs)
    let blockEndTypes = Object.values(blockTypePairs)

    // clear previos possible error styles
    document
      .querySelectorAll('.' + NODE_ERROR_CLASSNAME)
      .forEach(ErrorReporter.clearErrorStyle)

    for (let i = 0; i < activeNodes.length; i++) {
      let n = activeNodes[i]
      // blocks (start)
      // debugger
      if (blockStartTypes.includes(n.data.type)) {
        let arrayTail = activeNodes.slice(activeNodes.indexOf(n) + 1)
        let correspondingEnd = arrayTail.find(
          (tn) => tn.data.type == blockTypePairs[n.data.type],
        )
        if (!correspondingEnd) {
          // report error
          ErrorReporter.showUnbalancedNodeBlock(
            'end',
            n.data.type,
            activeNodes.indexOf(n),
          )
          let nodeSelectorString = `div[data-id=${n.id}]>div.${n.data.type}_wrapper`
          let nodeSelector = document.querySelector(nodeSelectorString)
          ErrorReporter.applyErrorStyle(nodeSelector)
          break
        }
      }
      // brackets (ends)
      else if (blockEndTypes.includes(n.data.type)) {
        let arrayHead = activeNodes.slice(0, activeNodes.indexOf(n))
        let correspondingStart = arrayHead.find(
          (tn) => tn.data.type == blockTypePairs[n.data.type],
        )
        if (!correspondingStart) {
          // report error
          ErrorReporter.showUnbalancedNodeBlock(
            'start',
            n.data.type,
            activeNodes.indexOf(n),
          )
          let nodeSelectorString = `div[data-id=${n.id}]>div.${n.data.type}_wrapper`
          let nodeSelector = document.querySelector(nodeSelectorString)
          ErrorReporter.applyErrorStyle(nodeSelector)
          break
        }
      }
    }

    useCodeStore.getState().clearCode()

    let transpiler = new NodeTranspiler(activeNodes)
    transpiler.transpile()
  }
  return (
    <div className='debug'>
      <button className='btn btn-primary' onClick={tryParseNodes}>
        {t('TRY_PARSE_NODES_BTN')}
      </button>
    </div>
  )
}

export default DebugNodes
