import './CodeEditor.scss'

import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'

import AceEditor from 'react-ace'

import Debug from './debug/Debug'
import { useEffect, useRef, useState } from 'react'
import { useCodeStore } from '../../store/CodeStore'

const CodeEditor = () => {
  const [codeChunks, setCodeChunks] = useState<string[]>([])

  const editorRef = useRef<AceEditor>(null)
  useEffect(() => {
    const editor = editorRef.current?.editor
    //@ts-ignore
    const currentLangStr = editor?.getSession().getMode().$id // $id prop exist but not declared in the type
    const currentLang = currentLangStr.split('/').at(-1)
    console.log(currentLang)
    useCodeStore.getState().setActiveLanguage(currentLang)
  }, [])

  useCodeStore.subscribe(state => {
    editorRef.current?.editor.getSession().setValue('')
    editorRef.current?.editor
      .getSession()
      .setValue(editorRef.current?.editor.getSession().getValue())
    editorRef.current?.editor.resize()
    state.codeChunks.forEach(cc => {
      editorRef.current?.editor.insert(cc)
    })
  })

  return (
    <div className='code__editor'>
      <div className='code__editor__wrapper'>
        <AceEditor
          ref={editorRef}
          mode='javascript'
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          onChange={console.log}
          name='editor'
          editorProps={{ $blockScrolling: true }}
        />
        <Debug />
      </div>
    </div>
  )
}

export default CodeEditor
