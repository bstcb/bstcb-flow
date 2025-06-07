import Select from 'react-select'
import './LanguageSelector.scss'
import { CodeLanguage } from '../../../../transpilers/CodeLanguage'
import { useCodeStore } from '../../../store/CodeStore'

const LanguageSelector = () => {
  const activeLanguage = useCodeStore.getState().activeLanguage
  const options = [
    { value: CodeLanguage.LANG_JS, label: CodeLanguage.LANG_JS },
    { value: CodeLanguage.LANG_CSHARP, label: CodeLanguage.LANG_CSHARP },
  ]
  const defaultOption = options.find((o) => o.value == activeLanguage)

  function languageChanged(e) {
    console.log(`[LanguageSelector]: language changed to: ${e.value}`)
    console.log(e)
    useCodeStore.getState().setActiveLanguage(e.value)
  }

  return (
    <>
      <div className='language__selector'>
        <div className='language__selector__wrapper'>
          <Select
            onChange={languageChanged}
            options={options}
            defaultValue={defaultOption}
          />
        </div>
      </div>
    </>
  )
}

export default LanguageSelector
