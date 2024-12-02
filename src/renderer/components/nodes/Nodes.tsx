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
import ContextMenu from '../ContextMenu'
import './Nodes.scss'

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
						x: getRandomInt(100, 100),
						y: getRandomInt(100, 300),
					},
					data: { label: value, value },
				}
				setNodes(nds => nds.concat(newNode))
			},
		)
		return () => {}
	}, [])

	const onConnect: OnConnect = useCallback(
		params => setEdges(eds => addEdge(params, eds)),
		[setEdges],
	)

	const onNodeContextMenu = useCallback(
		(event: React.MouseEvent, node: Node) => {
			// Prevent native context menu from showing
			event.preventDefault()
			console.log(event)
			// Calculate position of the context menu. We want to make sure it
			// doesn't get positioned off-screen.
			const pane = ref.current!.getBoundingClientRect()
			console.log(pane)
			setMenu({
				id: node.id,
				top: (event.clientY < pane.height - 200 && event.clientY) || 0,
				left: (event.clientX < pane.width - 200 && event.clientX) || 0,
				right:
					(event.clientX >= pane.width - 200 && pane.width - event.clientX) ||
					0,
				bottom:
					(event.clientY >= pane.height - 200 && pane.height - event.clientY) ||
					0,
			})
			console.log(menu)
		},
		[setMenu],
	)

	const onPaneClick = useCallback(() => setMenu(null), [setMenu])

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
