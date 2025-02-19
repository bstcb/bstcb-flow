import { Node, ReactFlowInstance } from 'reactflow'
import { NodeGen } from './NodeGen'
import { VariableParser } from './VariableParser'
import { NodeTokenKind } from './Token'
import { Variable } from '../renderer/types/variable'
import { ipcRenderer } from 'electron'
import { CodeLanguage } from './CodeLanguage'
import { useCodeStore } from '../renderer/store/CodeStore'
import { enumFromString } from '../helpers/helpers'
import { initialNodes } from '../renderer/components/nodes/initialNodes'

export type ParsableCode = {
    language: CodeLanguage,
    codeChunks: string[]
}
export type ParsedNode = {
    kind: NodeTokenKind,
    data: string,
}


export class CodeTranspiler {
    rfInstance: ReactFlowInstance
    codeChunks: string[]
    constructor(codeChunks: string[], rfInstance: ReactFlowInstance) {
        this.codeChunks = codeChunks
        this.rfInstance = rfInstance
    }
    transpile() {
        this.parse()
    }
    private parse() {
        // test
        // NodeGen.genInput({ name: 'x', value: '0' }, 1, this.rfInstance)
        // NodeGen.genIf({ name: 'x == 5', value: 'x == 5' }, 3, this.rfInstance)
        // NodeGen.genOutput({ name: 'a,b', value: 'a,b' }, 4, this.rfInstance)
        // NodeGen.genFor({ name: 'let i = 0; i < 5; i++', value: 'let i = 0; i < 5; i++' }, 1, this.rfInstance)
        // NodeGen.genWhile({ name: 'i < 5', value: 'i < 5' }, 1, this.rfInstance)

        let codeStoreState = useCodeStore.getState()

        let parsableCode: ParsableCode = {
            language: codeStoreState.activeLanguage,
            codeChunks: this.codeChunks
        }

        window.electron.ipcRenderer.sendMessage('parse-code', parsableCode)

        window.electron.ipcRenderer.once('parse-code', async (parseResults) => {
            // debugger
            console.log('parsed code returned')
            console.log('result')
            parseResults = JSON.parse(parseResults)
            console.log(parseResults)

            // @TODO: clear nodes

            this.rfInstance.setNodes(initialNodes)
            NodeGen.clearIndexedNodes()

            for (let i = 0; i < parseResults.length; i++) {
                let pr = parseResults[i]
                // parsing results
                let pro = Object.entries(pr) // parse result object
                console.log(pro)
                // if (pr.length != 2) {
                // @TODO: handle errors or undefined here
                // } else {
                // @TODO: handle error here
                let pn: ParsedNode = { // parsedNode
                    kind: NodeTokenKind.NTK_OUTPUT,
                    data: 'a,b'
                }
                console.log(pr)
                console.log(pro)
                console.log(pn)
                switch (pn.kind) {
                    case NodeTokenKind.NTK_INPUT:
                        NodeGen.genInput(pn.data, i, this.rfInstance)
                        break
                    case NodeTokenKind.NTK_OUTPUT:
                        NodeGen.genOutput(VariableParser.parse(pn.data, NodeTokenKind.NTK_OUTPUT), i, this.rfInstance)
                        break
                    case NodeTokenKind.NTK_IF_CONDITION:
                        NodeGen.genIf(pn.data, i, this.rfInstance)
                        break
                    case NodeTokenKind.NTK_FOR_LOOP:
                        NodeGen.genFor(pn.data, i, this.rfInstance)
                        break
                    case NodeTokenKind.NTK_WHILE_LOOP:
                        NodeGen.genWhile(pn.data, i, this.rfInstance)
                        break
                    default:
                        console.error(`wrong pn.kind ${pn.kind}`)

                }
                // }
            }


        })

    }
}

