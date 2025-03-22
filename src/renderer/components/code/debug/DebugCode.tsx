import { useReactFlow } from "reactflow"
import { CodeTranspiler } from "../../../../transpilers/CodeTranspiler"
import { useCodeStore } from "../../../store/CodeStore"
import { ErrorReporter } from "../../../errors/ErrorReporter"
import { codeUheckUnclosedDelimiters } from "../../../utils/codeUtils"
import { delimiter } from "path"

type Props = {
    code: string
}

const DebugCode = (props: Props) => {
    console.log(props.code)
    const rfInstance = useReactFlow()
    const tryParseCode = (code: string) => {
        console.log('trying to parse code')
        // @TODO: put code from editor to storage
        // validate blocks
        let dilimitersErorr = codeUheckUnclosedDelimiters(code)
        if (dilimitersErorr) {
            ErrorReporter.showUnbalancedCodeBlock(dilimitersErorr.delimiter, dilimitersErorr.line, dilimitersErorr.col)
            useCodeStore.getState().setCodeError({ message: `unmatched delimiter: ${dilimitersErorr.delimiter}`, line: dilimitersErorr.line, col: dilimitersErorr.col })
        } else {
            if (code.length > 0) {
                let transpiler = new CodeTranspiler(code, rfInstance)
                transpiler.transpile()
            } else {
                ErrorReporter.showShort("code editor is empty")
            }
        }
    }

    return (
        <div className='debug'>
            <button onClick={() => tryParseCode(props.code)}>Try Parse Code</button>
        </div>
    )
}

export default DebugCode
