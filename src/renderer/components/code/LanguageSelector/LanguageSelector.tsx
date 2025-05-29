import Select from 'react-select'
import './LanguageSelector.scss'
import { CodeLanguage } from '../../../../transpilers/CodeLanguage'
import { useCodeStore } from '../../../store/CodeStore'

const LanguageSelector = () => {
  const activeLanguage = useCodeStore.getState().activeLanguage
  const options = [
    { value: CodeLanguage.LANG_JS, label: CodeLanguage.LANG_JS },
    // @TODO: replace with actual C# mode
    { value: 'C#', label: 'C#' },
  ]
  const defaultOption = options.find((o) => o.value == activeLanguage)

  return (
    <>
      <div className='language__selector'>
        <div className='language__selector__wrapper'>
          <Select options={options} defaultValue={defaultOption} />
        </div>
      </div>
    </>
  )
}

export default LanguageSelector
