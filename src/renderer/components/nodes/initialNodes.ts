import { Edge, Node } from 'reactflow'

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
export const initialEdges: Edge[] = []
