import { Node } from 'reactflow'
import { create } from 'zustand'

type State = {
  nodes: Node[]
  setNodes: (nodes: Node[]) => void
}

export const useNodeStore = create<State>(set => ({
  nodes: [],
  setNodes: (nodes: Node[]) => {
    set(() => ({ nodes: nodes }))
    console.log('[STORE]: Nodes updated:', nodes)
  },
}))
