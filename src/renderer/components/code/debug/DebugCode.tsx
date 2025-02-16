import { useReactFlow } from "reactflow"
import { CodeTranspiler } from "../../../../transpilers/CodeTranspiler"
import { useCodeStore } from "../../../store/CodeStore"

type Props = {
    code: string
}

const DebugCode = (props: Props) => {
    console.log(props.code)
    const rfInstance = useReactFlow()
    const tryParseCode = (code: string) => {
        console.log('trying to parse code')
        // @TODO: put code from editor to storage
        useCodeStore.getState().setCodeChunks(code.split('\n'))
        let codeChunks = useCodeStore.getState().codeChunks
        console.log(codeChunks)
        let transpiler = new CodeTranspiler(codeChunks, rfInstance)
        transpiler.transpile()
    }

    return (
        <div className='debug'>
            <button onClick={() => tryParseCode(props.code)}>Try Parse Code</button>
        </div>
    )
}

export default DebugCode
