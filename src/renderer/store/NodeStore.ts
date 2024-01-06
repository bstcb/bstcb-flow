import { Connection, Edge, Node } from 'reactflow'
import { create } from 'zustand'

type State = {
  nodes: Node[]
  edges: Edge[] // leave for now
  connections: Connection[]
  setNodes: (nodes: Node[]) => void
  setEdges: (nodes: Edge[]) => void
  setConnections: (nodes: Connection[]) => void
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
  edges: [], // leave for now
  connections: [],
  setNodes: (nodes: Node[]) => {
    set(() => ({ nodes: nodes }))
    console.log('[STORE]: Nodes updated:', nodes)
  },

  setEdges: (edges: Edge[]) => {
    set(() => ({ edges: edges }))
    console.log('[STORE]: Edges updated:', edges)
  },

  setConnections: (connections: Connection[]) => {
    set(() => ({ connections: connections }))
    console.log('[STORE]: Connections updated:', connections)
  },
}))
