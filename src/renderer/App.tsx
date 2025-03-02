import { ReactFlowProvider } from 'reactflow'
import './App.scss'
import CodeEditor from './components/code/CodeEditor'
import Nodes from './components/nodes/Nodes'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DockLayout from 'rc-dock'
// light theme and custom file must go together, because dark theme remains unchanged 
import 'rc-dock/dist/rc-dock.css';
import './rc-dock-custom.scss'
// @TODO: dynamically choose (import) theme
// import 'rc-dock/dist/rc-dock-dark.css';
import { defaultLayout } from './defaultLayout'

const App = () => {
    return (
        <ReactFlowProvider>
            <DockLayout
                defaultLayout={defaultLayout}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            <ToastContainer />
        </ReactFlowProvider>
    )
}

export default App
