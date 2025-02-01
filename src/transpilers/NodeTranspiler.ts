import { Node } from 'reactflow'
import { NodeToken, NodeTokenKind, getTokenKind } from './Token'
import { CodeGen } from './Codegen'
import { VariableParser } from './VariableParser'

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
      console.log('current node in transpiler')
      console.log(n)
      if (!n.type!.startsWith('_')) {
        // initial nodes
        this.tokens.push({ type: NodeTokenKind.NTK_INITIAL, value: null })
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
          console.log('parsing INPUT node')
          console.log(token)
          CodeGen.genInput(VariableParser.parse(token.value!, NodeTokenKind.NTK_INPUT))
          break
        case NodeTokenKind.NTK_OUTPUT:
          console.log(
            `parsing OUTPUT node with name ${token.type} and value: ${token.value
            } of type ${typeof token.value}  `,
          )
          CodeGen.genOutput(VariableParser.parse(token.value!, NodeTokenKind.NTK_OUTPUT).value)
          break
        case NodeTokenKind.NTK_IF_CONDITION:
          console.log('parsing IF CONDITION node')
          CodeGen.genIf(VariableParser.parse(token.value!, NodeTokenKind.NTK_IF_CONDITION).value)
          break
        case NodeTokenKind.NTK_FOR_LOOP:
          console.log('parsing FOR LOOP node')
          CodeGen.genFor(VariableParser.parse(token.value!, NodeTokenKind.NTK_FOR_LOOP).value)
          break
        case NodeTokenKind.NTK_WHILE_LOOP:
          console.log('parsing WHILE LOOP node')
          CodeGen.genWhile(VariableParser.parse(token.value!, NodeTokenKind.NTK_WHILE_LOOP).value)
          break
        case NodeTokenKind.NTK_INITIAL:
          console.log('parsing INITIAL node')
          break
      }
    }
  }
}
