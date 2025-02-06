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
        NodeGen.genOutput({ name: 'a,b', value: 'a,b' }, 2, this.rfInstance)
        NodeGen.genOutput({ name: 'x,y', value: 'x,y' }, 3, this.rfInstance)
        // NodeGen.genIf({ name: 'x == 5', value: 'x == 5' }, 3, this.rfInstance)
        // NodeGen.genFor({ name: 'let i = 0; i < 5; i++', value: 'let i = 0; i < 5; i++' }, 1, this.rfInstance)
        // NodeGen.genWhile({ name: 'i < 5', value: 'i < 5' }, 1, this.rfInstance)
    }
}

