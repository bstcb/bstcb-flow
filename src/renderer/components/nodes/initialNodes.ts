import { Edge, Node } from 'reactflow';

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
  // {
  //   id: '_input_1',
  //   type: '_nput',
  //   position: { x: 0, y: 300 },
  //   data: { label: 'x = 0' },
  // },
];
export const initialEdges: Edge[] = [];
