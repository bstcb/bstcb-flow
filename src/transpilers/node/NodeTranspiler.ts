import { Node } from 'reactflow'
import { NodeToken, NodeTokenKind, getTokenKind } from '../Token'
import ace from 'react-ace'
import { CodeGen } from '../Codegen'
import { variableFromValue } from '../../helpers/helpers'

export class NodeTranspiler {
  private nodes: Node[] = []
  private tokens: NodeToken[] = []
  constructor(nodes: Node[]) {
    this.nodes = nodes
  }
  // main transpile function
  transpile() {
    this.tokenize()
    this.parse()
  }
  // tokenizing (Lexer)
  private tokenize() {
    this.nodes.forEach(n => {
      if (!n.type!.startsWith('_')) {
        // initial nodes
        this.tokens.push({ type: NodeTokenKind.NTK_INITAL, value: null })
        console.log(this.tokens)
      } else {
        let tokenKind = getTokenKind(n.type!)
        console.log(n.type!, tokenKind)
        let tokenValue: string = n.data.value ?? n.data.label
        this.tokens.push({ type: tokenKind!, value: tokenValue })
        console.log(this.tokens)
      }
    })
  }
  // parsing (Parser)
  private parse() {
    CodeGen.getActiveLang()
    for (let token of this.tokens) {
      switch (token.type) {
        case NodeTokenKind.NTK_INPUT:
          console.log('parsing input node')
          CodeGen.genInput(variableFromValue(token.value!))
      }
    }
  }
}
