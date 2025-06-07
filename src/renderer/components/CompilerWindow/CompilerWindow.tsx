import { useEffect, useState } from 'react'
import './CompilerWindow.scss'
import { useCodeStore } from '../../store/CodeStore'

const CompilerWindow = () => {
  const [error, setError] = useState<string>('')
  const [runResult, setRunResult] = useState<string>('')

  useEffect(() => {
    const unsubscribe = useCodeStore.subscribe((state) => {
      console.log(state.codeError)
      if (state.codeError) {
        setError(
          `${state.codeError.line}:${state.codeError.col}: ${state.codeError.message}`,
        )
      } else {
        setError('') // Clear error when codeError is null
      }
      if (state.runResult) {
        setRunResult(state.runResult)
      } else {
        setRunResult('')
      }
    })

    return unsubscribe
  }, [])

  return (
    <div className='window'>
      <div className='window__wrapper'>
        {error !== '' && (
          <div className='compiler__errors'>
            <div className='compiler__error'>{error}</div>
          </div>
        )}
        {runResult !== '' && <>{runResult}</>}
      </div>
    </div>
  )
}

export default CompilerWindow
