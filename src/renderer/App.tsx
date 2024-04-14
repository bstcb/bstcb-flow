import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import Toast from './components/ui/Toast'
import { useStyleStore } from './store/StyleStore'
import ErrorToast from './components/ui/ErrorToast'
import { useEffect, useState } from 'react'

const App = () => {
   const [errorToast, setErrorToast] = useState(useStyleStore.getState().isNodeToastError)
   useEffect(() => {

      // just need the way to transfer state
      useStyleStore.subscribe(state => {
         setErrorToast(true)
         const timer = setTimeout(() => {
            setErrorToast(false)
            console.log('timeout')
         }, 2000)
      })
   }, [errorToast])
   return (
      <ReactFlowProvider>
         <div className='main__wrapper'>
            <Nodes />
            <CodeEditor />
            {errorToast && <ErrorToast message={"You can't delete initial nodes"} />}
         </div>
      </ReactFlowProvider>
   )
}

export default App
