import React, { useCallback } from 'react'
import { useReactFlow } from 'reactflow'
import './ContextMenu.scss'
import { NodeContextMenu } from '../../types/nodeContextMenu'
import { ErrorReporter } from '../../errors/ErrorReporter'
import { NODE_DELETE_INITIAL_ERROR } from '../../constants'
import { useTranslation } from 'react-i18next'

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: NodeContextMenu) {
  const { getNode, getNodes, setNodes, addNodes, setEdges } = useReactFlow()
  const { t } = useTranslation()

  const deleteNode = useCallback(() => {
    console.log(!getNode(id)!.type!.startsWith('_'))
    if (getNode(id)!.type!.startsWith('_')) {
      setNodes((nodes) => nodes.filter((node) => node.id !== id))
      setEdges((edges) => edges.filter((edge) => edge.source !== id))
    } else {
      ErrorReporter.showShort(NODE_DELETE_INITIAL_ERROR)
    }
  }, [id, setNodes, setEdges])

  const node = getNode(id)
  const nodes = getNodes()

  const nodeIndex = nodes.indexOf(nodes.find((n) => n.id == id)!)
  return (
    <div style={{ top, left }} className='context__menu' {...props}>
      <p style={{ margin: '0.5em' }}>
        <small>
          node: {node?.type}
          {nodeIndex}
        </small>
      </p>
      <button onClick={deleteNode}>{t('NODE_DELETE_BUTTON')}</button>
    </div>
  )
}
