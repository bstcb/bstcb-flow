import { NodeTranspiler } from '../../../../transpilers/node/NodeTranspiler'
import { useNodeStore } from '../../../store/NodeStore'

const Debug = () => {
  const tryParseNodes = () => {
    console.log('trying to parse nodes')
    let currentConnections = useNodeStore.getState().connections

    let currentNodes = useNodeStore.getState().nodes // all displayed nodes

    let activeNodes = [] // actual connected nodes that need to be transpiled

    for (let i = 0; i < currentNodes.length; i++) {
      for (let j = 0; j < currentConnections.length; j++) {
        let node = currentNodes[i]
        let conn = currentConnections[j]
        // NOTE: if note connected it is need to be transpiled and displayed as code
        if (node.id == conn.target) {
          activeNodes.push(node)
          console.log('[DEBUG]: active nodes updated')
          console.log(activeNodes)
        }
      }
    }
    let transpiler = new NodeTranspiler(activeNodes)
    transpiler.transpile()
  }
  return (
    <div className='debug'>
      <button onClick={tryParseNodes}>Try Parse Nodes</button>
    </div>
  )
}

export default Debug
