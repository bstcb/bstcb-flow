import { Node, Edge, getConnectedEdges, useReactFlow } from 'reactflow'
import { useCodeStore } from '../../../store/CodeStore'
import { NodeTranspiler } from '../../../../transpilers/NodeTranspiler'
import { ErrorReporter } from '../../../errors/ErrorReporter'

const DebugNodes = () => {
    const { getNodes, getEdges, getNode } = useReactFlow()

    const getActiveNodes = (connectedEdges: Edge[]) => {

        let startEdge = connectedEdges.find(e => e.source === '_start')
        let endEdge = connectedEdges.find(e => e.target === '_end')

        if (!startEdge || !endEdge) {
            // @TODO: clarify the error
            ErrorReporter.showShort("you need to complete the flowchart first")
            return []
        }

        let activeNodes: Node[] = []

        for (let i = 0; i < connectedEdges.length; i++) {
            let edge = connectedEdges[i]
            if (getNode(edge.target))
                // omitting the initials, because they are not doing anything anyway
                if (edge.target !== '_end')
                    activeNodes.push(getNode(edge.target)!)
        }
        // debugger
        return activeNodes
    }
    const tryParseNodes = () => {
        console.log('trying to parse nodes')

        let currentNodes = getNodes()
        let currentEdges = getEdges()



        // actual connected nodes that need to be transpiled
        let connectedEdges: Edge[] = getConnectedEdges(currentNodes, currentEdges)
        console.log('[DEBUG]: connected edges are:')
        console.log(connectedEdges)

        let activeNodes: Node[] = getActiveNodes(connectedEdges)

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

export default DebugNodes
