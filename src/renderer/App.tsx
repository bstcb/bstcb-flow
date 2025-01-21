import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useState } from 'react'
import ErrorToast from './components/toasts/ErrorToast'

const App = () => {
    return (
        <ReactFlowProvider>
            <div className='main__wrapper'>
                <Nodes />
                <CodeEditor />
                <ErrorToast />
            </div>
        </ReactFlowProvider>
    )
}

export default App
