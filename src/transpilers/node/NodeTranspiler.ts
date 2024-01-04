import { Node } from 'reactflow'
import { NodeToken, NodeTokenKind, getTokenKind } from '../Token'

export class NodeTranspiler {
  private nodes: Node[] = []
  constructor(nodes: Node[]) {
    this.nodes = nodes
  }
  // main transpile function
  transpile() {
    this.tokenize()
  }
  // tokenizing (Lexer)
  private tokenize() {
    let tokens: NodeToken[] = []
    this.nodes.forEach(n => {
      if (!n.type!.startsWith('_')) {
        // initial nodes
        tokens.push({ type: NodeTokenKind.NTK_INITAL, value: null })
        console.log(tokens)
      } else {
        let t = getTokenKind(n.type!)
        console.log(Object.keys(NodeTokenKind))
        console.log(n.type!, getTokenKind(n.type!))
        let v: string = n.data.value ?? n.data.label
        tokens.push({ type: t!, value: v })
        console.log(tokens)
      }
    })
  }
  // parsing (Parser)
  private parse() {}
}
