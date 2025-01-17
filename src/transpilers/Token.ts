export type NodeToken = {
  type: NodeTokenKind
  value: string | null
}

export enum NodeTokenKind {
  NTK_IF_CONDITION = '_if_cond',
  NTK_FOR_LOOP = '_for_lp',
  NTK_WHILE_LOOP = '_while_lp',
  NTK_INPUT = '_input',
  NTK_OUTPUT = '_output',
  NTK_INITIAL = 'NTK_INITIAL', // does it need a name?
}

export function getTokenKind(token: string): NodeTokenKind | undefined {
  const key = Object.keys(NodeTokenKind).find(
    k => NodeTokenKind[k as keyof typeof NodeTokenKind] === token,
  )
  return key ? NodeTokenKind[key as keyof typeof NodeTokenKind] : undefined
}
