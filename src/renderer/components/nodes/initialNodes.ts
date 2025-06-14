import i18n from '../../../../i18config'
import { Edge, Node } from 'reactflow'

export const initialNodes: Node[] = [
  {
    id: '_start',
    position: { x: 0, y: 0 },
    type: 'input',
    data: { label: i18n.t('INIT_NODE_START') },
  },
  {
    id: '_end',
    position: { x: 0, y: 500 },
    type: 'output',
    data: { label: i18n.t('INIT_NODE_END') },
  },
]
export const initialEdges: Edge[] = []
