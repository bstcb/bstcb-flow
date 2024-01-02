import {
  Controls,
  Edge,
  Node,
  OnConnect,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import { v4 as uuid } from 'uuid'
import './Nodes.scss'

import { useCallback, useEffect, useMemo } from 'react'
import 'reactflow/dist/style.css'
import { getRandomInt } from '../../utils/random'
import InputNode from './custom/input/InputNode'
import IfConditionNode from './custom/ifCondition/IfConditionNode'
import { initialEdges, initialNodes } from './initialNodes'
import ForLoopNode from './custom/forLoop/ForLoopNode'
import WhileLoopNode from './custom/whileLoop/WhileLoopNode'
import OutputNode from './custom/output/OutputNode'

const Nodes = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges)

  useEffect(() => {
    window.electron.ipcRenderer.on(
      'add-node',
      (nodeType: string, value: string) => {
        setNodes(nodes => {
          let newNode: Node = {
            id: `_${nodeType}_${uuid()}`,
            type: nodeType,
            position: {
              x: getRandomInt(300, 500),
              y: getRandomInt(300, 500),
            },
            data: { label: value, value },
          }
          console.log(newNode.data)
          return [...nodes, newNode]
        })
      },
    )
    return () => {}
  }, [])

  const onConnect: OnConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges],
  )

  const nodeTypes = useMemo(
    () => ({
      _input: InputNode,
      _output: OutputNode,
      _if_cond: IfConditionNode,
      _for_lp: ForLoopNode,
      _while_lp: WhileLoopNode,
    }),
    [],
  )
  return (
    <div className='nodes'>
      <div className='nodes__wrapper'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default Nodes
