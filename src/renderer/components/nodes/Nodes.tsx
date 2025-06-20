import {
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  OnConnect,
  ReactFlow,
  addEdge,
  updateEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow'
import { v4 as uuid } from 'uuid'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'reactflow/dist/style.css'
import { getRandomInt } from '../../utils/random'
import InputNode from './custom/input/InputNode'
import IfConditionNode from './custom/ifCondition/IfConditionNode'
import { initialEdges, initialNodes } from './initialNodes'
import ForLoopNode from './custom/forLoop/ForLoopNode'
import WhileLoopNode from './custom/whileLoop/WhileLoopNode'
import OutputNode from './custom/output/OutputNode'
import './Nodes.scss'
import { NodeContextMenu } from '../../types/nodeContextMenu'
import ContextMenu from '../ContextMenu/ContextMenu'
import IfConditionEndNode from './custom/ifConditionEnd/IfConditionEndNode'
import ForLoopEndNode from './custom/forLoopEnd/ForLoopEndNode'
import WhileLoopEndNode from './custom/whileLoopEnd/WhileLoopEndNode'
import { enumFromString } from '../../../helpers/helpers'
import { NodeTokenKind } from '../../../transpilers/Token'
import { NODE_POSITION_Y_OFFSET } from '../../constants'
import { getNextNodeYPositionFromNodes } from '../../utils/nodeUtils'

const Nodes = () => {
  const { addNodes, getNodes } = useReactFlow()
  // variables
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges)
  const [menu, setMenu] = useState<NodeContextMenu | null>(null)
  const edgeUpdateSuccessful = useRef(true)
  const ref = useRef<any>(null)
  // functions for edge delition
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false
  }, [])

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true
      setEdges((els) => updateEdge(oldEdge, newConnection, els))
    },
    [],
  )

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id))
    }

    edgeUpdateSuccessful.current = true
  }, [])

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'add-node',
      (nodeType: string, value: string) => {
        let newNodeY = getNextNodeYPositionFromNodes(getNodes())
        console.log('newNodeY: ' + newNodeY)
        let newNode: Node = {
          id: `_${nodeType}_${uuid()}`,
          type: nodeType,
          position: {
            // center x position relative
            // to position of first node (`Start`)
            x: nodes[0].position.x,
            // use dedicated function to calculate
            // new node's position
            // because of unsorted nodes
            y: newNodeY,
          },
          data: {
            id: null,
            label: value,
            value: value,
          },
        }
        newNode.data.id = newNode.id
        newNode.data.type = enumFromString(NodeTokenKind, nodeType)
        addNodes(newNode)
      },
    )
    return () => {}
  }, [])

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
            style: { strokeWidth: 2 },
          },
          eds,
        ),
      ),
    [setEdges],
  )

  const onPaneClick = useCallback(() => setMenu(null), [setMenu])

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Prevent native context menu from showing
      event.preventDefault()
      // console.log(event)
      const paneRect = ref.current!.getBoundingClientRect()
      const menuWidth = 200 // Adjust this value based on your actual menu width
      const menuHeight = 300 // Adjust this value based on your actual menu height
      console.log(paneRect)

      let top = Math.min(event.clientY, paneRect.bottom - menuHeight)
      let left = Math.min(event.clientX, paneRect.right - menuWidth)

      if (top < 0) top = 0
      if (left < 0) left = 0

      setMenu({
        id: node.id,
        top,
        left,
        right: paneRect.right - left,
        bottom: paneRect.bottom - top,
        onClick: onPaneClick,
      })
      console.log(menu)
    },
    [ref, setMenu, onPaneClick],
  )

  const nodeTypes = useMemo(
    () => ({
      _input: InputNode,
      _output: OutputNode,
      _if_cond: IfConditionNode,
      _if_cond_end: IfConditionEndNode,
      _for_lp: ForLoopNode,
      _for_lp_end: ForLoopEndNode,
      _while_lp: WhileLoopNode,
      _while_lp_end: WhileLoopEndNode,
    }),
    [],
  )

  return (
    <div className='nodes'>
      <div className='nodes__wrapper'>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          // content menu
          onPaneClick={onPaneClick}
          onNodeContextMenu={onNodeContextMenu}
          fitView
          // node update props
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}>
          {menu && <ContextMenu {...menu} />}
        </ReactFlow>
      </div>
    </div>
  )
}

export default Nodes
