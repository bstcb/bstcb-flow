import { NodeParser } from '../../../../fcParser/NodeParser'
import { useNodeStore } from '../../../store/NodeStore'

const Debug = () => {
  const tryParseNodes = () => {
    console.log('trying to parse nodes')
    let currentNodes = useNodeStore.getState().nodes
    console.log(currentNodes)
    NodeParser.parse(currentNodes)
  }
  return (
    <div className='debug'>
      <button onClick={tryParseNodes}>Try Parse Nodes</button>
    </div>
  )
}

export default Debug
