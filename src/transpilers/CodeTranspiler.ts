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
import { ErrorReporter } from '../renderer/errors/ErrorReporter'
import { NodeCreationData } from '../renderer/types/nodeCreationData'

export type ParsableCode = {
    language: CodeLanguage
    code: string
}
export type ParsedNode = {
    kind: NodeTokenKind
    data: string
}

export class CodeTranspiler {
    rfInstance: ReactFlowInstance
    code: string
    constructor(code: string, rfInstance: ReactFlowInstance) {
        this.code = code
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
            code: this.code,
        }

        window.electron.ipcRenderer.sendMessage('parse-code', parsableCode)

        window.electron.ipcRenderer.once('parse-code', async parseResults => {
            // debugger
            console.log('parsed code returned')
            console.log('result')
            console.log(parseResults)
            parseResults: parseResults = JSON.parse(parseResults)
            console.log(parseResults)
            console.log(typeof parseResults)
            // error handle
            if (typeof parseResults == 'string') {
                let message = parseResults
                let line = Number(parseResults.split('').at(-1))
                useCodeStore.getState().setCodeError({ message, line, col: 0 })
            } else {
                // cleanup 
                if (useCodeStore.getState().codeError)
                    useCodeStore.getState().clearCodeError()
                this.rfInstance.setNodes(initialNodes)
                NodeGen.clearIndexedNodes()

                for (let i = 0; i < parseResults.length; i++) {
                    let pr = parseResults[i]
                    let prk = Object.keys(pr)[0] // parseResult kind
                    let prv = Object.values(pr)[0] // parseResult data
                    console.log('pr')
                    console.log(pr)
                    // parsing results
                    let pn: ParsedNode = {
                        kind: enumFromString(NodeTokenKind, prk),
                        data: prv,
                    }
                    console.log('pn')
                    console.log(pn)
                    if (pn.kind == NodeTokenKind.NTK_BLOCK_END) {
                        NodeGen.genBlockEnd(i, this.rfInstance)
                    } else {
                        let nodeCreationData: NodeCreationData = { type: pn.kind, variable: pn.data } 
                        NodeGen.genNode(nodeCreationData, i, this.rfInstance)
                    }
                }
            }
        })
    }
}
