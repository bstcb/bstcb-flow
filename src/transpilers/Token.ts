export type NodeToken = {
  type: NodeTokenKind
  value: string | null
}

export enum NodeTokenKind {
  NTK_FOR_LOOP = '_for_lp',
  NTK_WHILE_LOOP = '_while_lp',
  NTK_INPUT = '_input',
  NTK_OUTPUT = '_output',
  NTK_INITAL = 'NTK_INITAL', // does it need a name?
}

export function getTokenKind(tokenKind: string): NodeTokenKind | undefined {
  for (let key of Object.keys(NodeTokenKind)) {
    if (tokenKind.toUpperCase() == key) {
      // TODO: not implemeted
      return undefined
    }
  }
}
