import { useReactFlow } from 'reactflow'
import { CodeTranspiler } from '../../../../transpilers/CodeTranspiler'
import { useCodeStore } from '../../../store/CodeStore'
import { ErrorReporter } from '../../../errors/ErrorReporter'
import { codeUheckUnclosedDelimiters } from '../../../utils/codeUtils'
import { delimiter } from 'path'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../../i18config'
import { JSInterpriter } from '../../../../interpriters/JSInterpriter'
import { useRunStore } from '../../../store/RunStore'

type Props = {
  code: string
}

const RunCode = (props: Props) => {
  console.log(props.code)
  const rfInstance = useReactFlow()
  const { t } = useTranslation()
  const runCode = (code: string) => {
    console.log('running code')
    const runResult = JSInterpriter.runCode(code)
    console.log(runResult)
    useRunStore.getState().setRunResult(runResult)
  }

  return (
    <div className='debug'>
      <button className='btn btn-primary' onClick={() => runCode(props.code)}>
        {t('RUN_CODE_BTN')}
      </button>
    </div>
  )
}

export default RunCode
