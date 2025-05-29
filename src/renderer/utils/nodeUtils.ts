import { Node } from 'reactflow'
import { NODE_POSITION_Y_OFFSET } from '../constants'

export function getNextNodeYPositionFromNodes(nodes: Node[]) {
  // if we only have 2 nodes,
  // means that this node will be first to add
  // so just return `_start` position + offset
  if (nodes.length == 2) return nodes[0].position.y + NODE_POSITION_Y_OFFSET

  // sort all added nodes and get the lowest (highest `y`) node
  let customNodesSortedByPosition = nodes
    .filter((n) => n.type!.startsWith('_'))
    .sort((a, b) => b.position.y - a.position.y)
  // return it's `y` + offset
  return customNodesSortedByPosition[0].position.y + NODE_POSITION_Y_OFFSET
}

export function getNextNodeYPositionFromIndex(index: number) {
  // debugger
  let res: number = 0

  if (index == 0) {
    res = NODE_POSITION_Y_OFFSET
  } else if (index == 1) {
    res = NODE_POSITION_Y_OFFSET * 2
  } else {
    res = NODE_POSITION_Y_OFFSET * index
  }

  return res
}
