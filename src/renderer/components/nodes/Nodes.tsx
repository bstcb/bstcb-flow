import {
    Connection,
    Controls,
    Edge,
    Node,
    OnConnect,
    ReactFlow,
    addEdge,
    updateEdge,
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
import './Nodes.scss'
import { NodeContextMenu } from '../../types/nodeContextMenu'
import ContextMenu from '../ContextMenu/ContextMenu'
import IfConditionEndNode from './custom/ifConditionEnd/IfConditionEndNode'

const Nodes = () => {
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
            setEdges(els => updateEdge(oldEdge, newConnection, els))
        },
        [],
    )

    const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
        if (!edgeUpdateSuccessful.current) {
            setEdges(eds => eds.filter(e => e.id !== edge.id))
        }

        edgeUpdateSuccessful.current = true
    }, [])

    useEffect(() => {
        window.electron.ipcRenderer.on(
            'add-node',
            (nodeType: string, value: string) => {
                let newNode: Node = {
                    id: `_${nodeType}_${uuid()}`,
                    type: nodeType,
                    position: {
                        x: getRandomInt(100, 150),
                        y: getRandomInt(100, 300),
                    },
                    data: {
                        id: null,
                        label: value,
                        value: value,
                    },
                }
                newNode.data.id = newNode.id
                setNodes(nds => nds.concat(newNode))
            },
        )
        return () => {}
    }, [])

    const onConnect: OnConnect = useCallback(
        params => setEdges(eds => addEdge(params, eds)),
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
                    {menu && <ContextMenu {...menu} />}
                </ReactFlow>
            </div>
        </div>
    )
}

export default Nodes
