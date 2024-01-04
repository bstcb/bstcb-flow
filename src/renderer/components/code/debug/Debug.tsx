import { NodeTranspiler } from '../../../../transpilers/node/NodeTranspiler'
import { useNodeStore } from '../../../store/NodeStore'

const Debug = () => {
  const tryParseNodes = () => {
    console.log('trying to parse nodes')
    let currentNodes = useNodeStore.getState().nodes
    console.log(currentNodes)
    let transpiler = new NodeTranspiler(currentNodes)
    transpiler.transpile()
  }
  return (
    <div className='debug'>
      <button onClick={tryParseNodes}>Try Parse Nodes</button>
    </div>
  )
}

export default Debug
