import { Node } from 'reactflow'
import { create } from 'zustand'

type State = {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
}

// FIXME: code duplicate from Nodes.tsx; maybe will fix
export const initialNodes: Node[] = [
  {
    id: '_start',
    position: { x: 0, y: 0 },
    type: 'input',
    data: { label: 'Start' },
  },
  {
    id: '_end',
    position: { x: 0, y: 500 },
    type: 'output',
    data: { label: 'End' },
  },
]

export const useNodeStore = create<State>(set => ({
  nodes: initialNodes,
  setNodes: (nodes: Node[]) => {
    set(() => ({ nodes: nodes }))
    console.log('[STORE]: Nodes updated:', nodes)
  },
}))
