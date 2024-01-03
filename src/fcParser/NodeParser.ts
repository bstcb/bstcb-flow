import { Node } from 'reactflow'

export class NodeParser {
  static parse(nodes: Node[]) {
    nodes.forEach(n => {
      this.parseP(n.type!, n.data.value ?? n.data.label)
    })
  }

  private static parseP(type: string, value: string) {
    console.log(type, value)
  }
}
