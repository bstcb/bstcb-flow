import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useStyleStore } from './store/StyleStore'
import ErrorToast from './components/toasts/ErrorToast'
import { useEffect, useState } from 'react'

const App = () => {
   const [errorToast, setErrorToast] = useState(useStyleStore.getState().isNodeToastError)
   return (
      <ReactFlowProvider>
         <div className='main__wrapper'>
            <Nodes />
            <CodeEditor />
            <ErrorToast message={"You can't delete initial nodes"} />
         </div>
      </ReactFlowProvider>
   )
}

export default App
