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
        let codeChunks = code.split('\n')
        // empty line and bracket line check
        codeChunks = codeChunks.filter(cc => cc.trim().length > 3)
        codeChunks = codeChunks.map(e => e + "\n")
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
