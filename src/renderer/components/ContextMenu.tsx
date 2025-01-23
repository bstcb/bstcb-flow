import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import { NodeContextMenu } from '../types/nodeContextMenu'
import './ContextMenu.scss'
import { useErrorStore } from '../store/ErrorStore'
import { NodeError } from '../errors/NodeError'
import { DELETE_INITIAL_NODE_ERROR } from '../constants'

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    ...props
}: NodeContextMenu) {
    const { getNode, getNodes, setNodes, addNodes, setEdges } = useReactFlow()

    const deleteNode = useCallback(() => {
        console.log(!getNode(id)!.type!.startsWith('_'))
        if (getNode(id)!.type!.startsWith('_')) {
            setNodes(nodes => nodes.filter(node => node.id !== id))
            setEdges(edges => edges.filter(edge => edge.source !== id))
        } else {
            NodeError.showShort(DELETE_INITIAL_NODE_ERROR)
        }
    }, [id, setNodes, setEdges])

    const node = getNode(id)
    const nodes = getNodes()

    const nodeIndex = nodes.indexOf(nodes.find(n => n.id == id)!)
    return (
        <div style={{ top, left }} className='context__menu' {...props}>
            <p style={{ margin: '0.5em' }}>
                <small>
                    node: {node?.type}
                    {nodeIndex}
                </small>
            </p>
            <button onClick={deleteNode}>delete</button>
        </div>
    )
}
