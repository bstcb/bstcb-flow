import { useReactFlow } from "reactflow"
import { CodeTranspiler } from "../../../../transpilers/CodeTranspiler"
import { useCodeStore } from "../../../store/CodeStore"

const DebugCode = () => {
    const rfInstance = useReactFlow()
    const tryParseCode = () => {
        console.log('trying to parse code')
        let codeChunks = useCodeStore.getState().codeChunks
        let transpiler = new CodeTranspiler(codeChunks, rfInstance)
        transpiler.transpile()
    }

    return (
        <div className='debug'>
            <button onClick={tryParseCode}>Try Parse Code</button>
        </div>
    )
}

export default DebugCode
