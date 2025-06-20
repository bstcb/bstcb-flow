import { useReactFlow } from 'reactflow'
import { CodeTranspiler } from '../../../../transpilers/CodeTranspiler'
import { useCodeStore } from '../../../store/CodeStore'
import { ErrorReporter } from '../../../errors/ErrorReporter'
import { codeUheckUnclosedDelimiters } from '../../../utils/codeUtils'
import { delimiter } from 'path'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../../i18config'

type Props = {
  code: string
}

const DebugCode = (props: Props) => {
  console.log(props.code)
  const rfInstance = useReactFlow()
  const { t } = useTranslation()
  const tryParseCode = (code: string) => {
    // debugger
    console.log('trying to parse code')
    // @TODO: put code from editor to storage
    // validate blocks
    let dilimitersErorr = codeUheckUnclosedDelimiters(code)
    if (dilimitersErorr) {
      ErrorReporter.showUnbalancedCodeBlock(
        dilimitersErorr.delimiter,
        dilimitersErorr.line,
        dilimitersErorr.col,
      )
      useCodeStore.getState().setCodeError({
        message: `unmatched delimiter: ${dilimitersErorr.delimiter}`,
        line: dilimitersErorr.line,
        col: dilimitersErorr.col,
      })
    } else {
      if (code.length > 0) {
        let transpiler = new CodeTranspiler(code, rfInstance)
        transpiler.transpile()
      } else {
        ErrorReporter.showShort(i18n.t('CODE_EDITOR_EMPTY_ERROR'))
      }
    }
  }

  return (
    <div className='debug'>
      <button
        className='btn btn-primary'
        onClick={() => tryParseCode(props.code)}>
        {t('TRY_PARSE_CODE_BTN')}
      </button>
    </div>
  )
}

export default DebugCode
