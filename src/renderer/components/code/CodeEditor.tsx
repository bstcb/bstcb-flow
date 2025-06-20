import './CodeEditor.scss'

import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-csharp'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-tomorrow'

import AceEditor from 'react-ace'

import { useEffect, useRef, useState } from 'react'
import { useCodeStore } from '../../store/CodeStore'
import { NodeToken, NodeTokenKind } from '../../../transpilers/Token'
import DebugNodes from './debug/DebugNodes'
import DebugCode from './debug/DebugCode'
import CompilerWindow from '../CompilerWindow'
import LanguageSelector from './LanguageSelector/LanguageSelector'
import RunCode from './debug/RunCode'

const CodeEditor = () => {
  const [code, setCode] = useState<string>('')
  const [lang, setLang] = useState<string>(
    useCodeStore.getState().activeLanguage,
  )

  const editorRef = useRef<AceEditor>(null)
  const unsubscribe = useCodeStore.subscribe((state) => {
    const activeLang = state.activeLanguage
    setLang(activeLang)
    const editor = editorRef.current?.editor
    //@ts-ignore
    const currentLangStr = editor?.getSession().getMode().$id // $id prop exist but not declared in the type
    const currentLang = currentLangStr.split('/').at(-1)
    console.log('currentLang')
    console.log(currentLangStr)
    if (currentLang !== activeLang) {
      editor?.getSession().setMode(`ace/mode/${activeLang}`)
      console.log(currentLang)
    }
    return unsubscribe
  })
  const isDarkTheme =
    localStorage.getItem('settings') &&
    JSON.parse(localStorage.getItem('settings'))['general.colorTheme'] == 'dark'

  useCodeStore.subscribe((state) => {
    if (state.codeError) {
      editorRef.current?.editor.selection.moveCursorTo(
        state.codeError.line,
        state.codeError.col,
        true,
      )
      editorRef.current?.editor.selection.selectLine()
    } else {
      editorRef.current?.editor.setValue(state.code)
    }
  })

  return (
    <div className='code__editor'>
      <div className='code__editor__wrapper'>
        <AceEditor
          ref={editorRef}
          mode='javascript'
          theme={isDarkTheme ? 'terminal' : ''}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          onChange={setCode}
          name='editor'
          editorProps={{ $blockScrolling: true }}
        />
        <LanguageSelector />
        <DebugNodes />
        <DebugCode code={code} />
        {useCodeStore.getState().activeLanguage == 'javascript' && (
          <RunCode code={code} />
        )}
      </div>
    </div>
  )
}

export default CodeEditor
