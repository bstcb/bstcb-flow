import { Node, ReactFlowInstance } from 'reactflow'
import { NodeGen } from './NodeGen'
import { VariableParser } from './VariableParser'
import { NodeTokenKind } from './Token'
import { Variable } from '../renderer/types/variable'

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
        NodeGen.genInput({ name: 'x', value: '0' }, 1, this.rfInstance)
    }
}

