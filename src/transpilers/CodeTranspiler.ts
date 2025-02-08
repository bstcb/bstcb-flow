import { Node, ReactFlowInstance } from 'reactflow'
import { NodeGen } from './NodeGen'
import { VariableParser } from './VariableParser'
import { NodeTokenKind } from './Token'
import { Variable } from '../renderer/types/variable'
import { ipcRenderer } from 'electron'
import { CodeLanguage } from './CodeLanguage'
import { useCodeStore } from '../renderer/store/CodeStore'

export type ParsableCode = {
    language: CodeLanguage,
    codeChunks: string[]
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
            codeChunks: codeStoreState.codeChunks
        }

        window.electron.ipcRenderer.sendMessage('parse-code', parsableCode)

        window.electron.ipcRenderer.on('parse-code', async (result) => {
            console.log('parsed code returned')
            console.log('result')
            console.log(result)
        })
    }
}

