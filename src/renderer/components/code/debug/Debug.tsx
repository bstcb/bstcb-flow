import { getConnectedEdges, useReactFlow } from 'reactflow'
import { NodeTranspiler } from '../../../../transpilers/node/NodeTranspiler'
import { useCodeStore } from '../../../store/CodeStore'

const Debug = () => {
   const { getNodes, getEdges, getNode } = useReactFlow()
   const tryParseNodes = () => {
      console.log('trying to parse nodes')

      let currentNodes = getNodes()
      let currentEdges = getEdges()



      // actual connected nodes that need to be transpiled
      let activeNodes = getConnectedEdges(currentNodes, currentEdges)
         .map(e => getNode(e.source))

      console.log('[DEBUG]: active nodes are:')
      console.log(activeNodes)

      useCodeStore.getState().clearCodeChunks()

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
