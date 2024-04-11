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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import 'reactflow/dist/style.css'
import { getRandomInt } from '../../utils/random'
import InputNode from './custom/input/InputNode'
import IfConditionNode from './custom/ifCondition/IfConditionNode'
import { initialEdges, initialNodes } from './initialNodes'
import ForLoopNode from './custom/forLoop/ForLoopNode'
import WhileLoopNode from './custom/whileLoop/WhileLoopNode'
import OutputNode from './custom/output/OutputNode'
import { useNodeStore } from '../../store/NodeStore'
import ContextMenu from '../ContextMenu'
import './Nodes.scss'

const Nodes = () => {
   // variables
   const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes)
   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges)
   const [menu, setMenu] = useState(null);
   const edgeUpdateSuccessful = useRef(true);
   const ref = useRef(null);
   // functions for edge delition
   const onEdgeUpdateStart = useCallback(() => {
      edgeUpdateSuccessful.current = false;
   }, []);

   const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
   }, []);

   const onEdgeUpdateEnd = useCallback((_, edge) => {
      if (!edgeUpdateSuccessful.current) {
         setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
   }, []);

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
               // console.log(newNode.data)
               useNodeStore.getState().setNodes([...nodes, newNode])
               return [...nodes, newNode]
            })
         },
      )
      return () => {}
   }, [])

   const onConnect: OnConnect = useCallback(
      connection => {
         setEdges(eds => addEdge(connection, eds))
         let connections = useNodeStore.getState().connections
         useNodeStore.getState().setConnections([...connections, connection])
      },
      [setEdges],
   )

   const onNodeContextMenu = useCallback(
      (event, node) => {
         // Prevent native context menu from showing
         event.preventDefault();
         console.log(event)
         // Calculate position of the context menu. We want to make sure it
         // doesn't get positioned off-screen.
         const pane = ref.current.getBoundingClientRect();
         console.log(pane)
         setMenu({
            id: node.id,
            top: event.clientY < pane.height - 200 && event.clientY,
            left: event.clientX < pane.width - 200 && event.clientX,
            right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
            bottom:
               event.clientY >= pane.height - 200 && pane.height - event.clientY,
         });
         console.log(menu)
      },
      [setMenu],
   );

   const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

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
ref={ref}
               nodes={nodes}
               edges={edges}
               onConnect={onConnect}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               nodeTypes={nodeTypes}
               onConnect={onConnect}
               // content menu
               onPaneClick={onPaneClick}
               onNodeContextMenu={onNodeContextMenu}
               fitView
               // node update props
               onEdgeUpdate={onEdgeUpdate}
               onEdgeUpdateStart={onEdgeUpdateStart}
               onEdgeUpdateEnd={onEdgeUpdateEnd}
            >
               <Controls />
               {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
            </ReactFlow>
         </div>
      </div>
   )
}

export default Nodes
