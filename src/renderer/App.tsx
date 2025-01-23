import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const App = () => {
    return (
        <ReactFlowProvider>
            <div className='main__wrapper'>
                <Nodes />
                <CodeEditor />
            </div>
            <ToastContainer />
        </ReactFlowProvider>
    )
}

export default App
