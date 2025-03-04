import './CodeEditor.scss'

import 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'

import AceEditor from 'react-ace'

import { useEffect, useRef, useState } from 'react'
import { useCodeStore } from '../../store/CodeStore'
import { NodeToken, NodeTokenKind } from '../../../transpilers/Token'
import DebugNodes from './debug/DebugNodes'
import DebugCode from './debug/DebugCode'
import CompilerWindow from '../CompilerWindow'

const CodeEditor = () => {
    const [code, setCode] = useState<string>('')

    const editorRef = useRef<AceEditor>(null)
    useEffect(() => {
        const editor = editorRef.current?.editor
        //@ts-ignore
        const currentLangStr = editor?.getSession().getMode().$id // $id prop exist but not declared in the type
        const currentLang = currentLangStr.split('/').at(-1)
        console.log(currentLang)
        useCodeStore.getState().setActiveLanguage(currentLang)
    }, [])

    const isBlockScope = (n: string) => {
        if (n.split('').at(-1) == '{' || n.split('').at(-2) == '{') {
            return true
        } else {
            return false
        }
    }

    useCodeStore.subscribe(state => {
        if (state.codeError) {
            editorRef.current?.editor.selection.moveCursorTo(state.codeError.position, 0, true)
            editorRef.current?.editor.selection.selectLine()
        } else {
            editorRef.current?.editor.setValue('')
            state.codeChunks.forEach(c => {
                console.log(isBlockScope(c))
                editorRef.current?.editor.insert(c)
                // need to know amount of lines (probuably implement end[If|For|While]) as nodes
                if (isBlockScope(c)) editorRef.current?.editor.insert('}\n')
            })
        }
    })

    return (
        <div className='code__editor'>
            <div className='code__editor__wrapper'>
                <AceEditor
                    ref={editorRef}
                    mode='javascript'
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    onChange={setCode}
                    name='editor'
                    editorProps={{ $blockScrolling: true }}
                />
                <DebugNodes />
                <DebugCode code={code} />
            </div>
        </div>
    )
}

export default CodeEditor
