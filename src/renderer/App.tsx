import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'

const App = () => {
   return (
      <ReactFlowProvider>
         <div className='main__wrapper'>
            <Nodes />
            <CodeEditor />
         </div>
      </ReactFlowProvider>
   )
}

export default App
